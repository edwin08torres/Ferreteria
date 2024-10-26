import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import fs from "fs";
import path from "path";

// Verificar si la variable de entorno está definida
if (!process.env.OPENAI_API_KEY) {
  throw new Error("La clave de API de OpenAI no está configurada");
}


// Configuración para OpenAI
const API_URL = "https://api.openai.com/v1/chat/completions";
const API_KEY = process.env.OPENAI_API_KEY;


const CANTIDAD_BAJA_UMBRAL = 5; // Umbral para advertir sobre inventario bajo

// Interfaz para la respuesta de OpenAI
interface OpenAIResponse {
  choices: { message: { content: string } }[];
}

// Cargar datos de `db.json`
const dbPath = path.join(process.cwd(), "db.json");
const db = JSON.parse(fs.readFileSync(dbPath, "utf-8"));

console.log("Ruta de db.json:", dbPath);


// Función para buscar productos por nombre
const buscarProducto = (nombreProducto: string) => {
  return db.productos.find(
    (producto: any) =>
      producto.nombre.toLowerCase() === nombreProducto.toLowerCase()
  );
};

// Funciones para ventas y productos
const productoMasCaro = () =>
  db.productos.reduce(
    (max: any, producto: any) =>
      producto.precio > max.precio ? producto : max,
    db.productos[0]
  );
const productoMenosCaro = () =>
  db.productos.reduce(
    (min: any, producto: any) =>
      producto.precio < min.precio ? producto : min,
    db.productos[0]
  );
const ventaMasExitosa = () =>
  db.ventas.reduce(
    (max: any, venta: any) =>
      venta.cantidad * buscarProducto(venta.producto)?.precio >
      max.cantidad * buscarProducto(max.producto)?.precio
        ? venta
        : max,
    db.ventas[0]
  );
const ventaMasBaja = () =>
  db.ventas.reduce(
    (min: any, venta: any) =>
      venta.cantidad * buscarProducto(venta.producto)?.precio <
      min.cantidad * buscarProducto(min.producto)?.precio
        ? venta
        : min,
    db.ventas[0]
  );

// Filtrar ventas de los últimos 7 días
const ventasUltimos7Dias = () => {
  const ahora = new Date();
  const hace7Dias = new Date(ahora);
  hace7Dias.setDate(ahora.getDate() - 7);
  return db.ventas.filter(
    (venta: any) => new Date(venta.fechaVenta) >= hace7Dias
  );
};

// Día con menos ventas
const diaConMenosVentas = () => {
  const ventasPorDia: { [key: string]: number } = {};
  db.ventas.forEach((venta: any) => {
    const fecha = venta.fechaVenta;
    ventasPorDia[fecha] = (ventasPorDia[fecha] || 0) + venta.cantidad;
  });
  const [diaMenosVentas] = Object.entries(ventasPorDia).reduce((min, actual) =>
    actual[1] < min[1] ? actual : min
  );
  return diaMenosVentas;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    if (req.method === "POST") {
      const { question } = req.body;
      console.log("Pregunta recibida:", question);
  
      // Usar expresión regular para extraer el nombre del producto
      const match = question.match(
        /(?:cuánto|tenemos|hay|disponible|es|cuál|producto|venta|inventario)\s*(\w+)?(?:\s+tenemos|\s+disponible|\s+hay|\s+precio|\s+caro)?/i
      );
      const nombreProducto = match ? match[1] : "";
      console.log("Nombre del producto identificado:", nombreProducto);
  
      // Validar si la pregunta está relacionada con inventario o ventas
      const esPreguntaInventario = /(inventario|producto|tenemos|disponible|hay|cantidad)/i.test(question);
      const esPreguntaVentas = /(venta|compras|días|exitosa|baja)/i.test(question);
  
      // Procesar preguntas relacionadas con productos
      if (esPreguntaInventario && nombreProducto) {
        const producto = buscarProducto(nombreProducto);
        console.log("Producto encontrado:", producto);
  
        if (producto) {
          const respuestaInventario =
            producto.cantidad < CANTIDAD_BAJA_UMBRAL
              ? `No se posee suficiente unidades de ${producto.nombre}, deberíamos reabastecer pronto.`
              : `Sí, tenemos ${producto.cantidad} unidades de ${producto.nombre} disponibles.`;
          return res.status(200).json({ response: respuestaInventario });
        } else {
          return res
            .status(200)
            .json({
              response: `No tenemos el producto ${nombreProducto} en inventario.`,
            });
        }
      }
  
      // Procesar preguntas relacionadas con ventas
      if (esPreguntaVentas) {
        if (question.toLowerCase().includes("venta más exitosa")) {
          const venta = ventaMasExitosa();
          const producto = buscarProducto(venta.producto);
          const total = venta.cantidad * producto.precio;
          return res
            .status(200)
            .json({
              response: `La venta más exitosa fue de ${venta.cantidad} unidades de ${venta.producto} por un total de ${total}.`,
            });
        }
  
        if (question.toLowerCase().includes("últimos 7 días")) {
          const ventas = ventasUltimos7Dias();
          if (ventas.length > 0) {
            const respuesta = ventas
              .map(
                (venta: any) =>
                  `${venta.cantidad} unidades de ${venta.producto} vendidas el ${venta.fechaVenta}`
              )
              .join("; ");
            return res
              .status(200)
              .json({ response: `Ventas en los últimos 7 días: ${respuesta}.` });
          } else {
            return res
              .status(200)
              .json({ response: "No hubo ventas en los últimos 7 días." });
          }
        }
  
        if (question.toLowerCase().includes("venta más baja")) {
          const venta = ventaMasBaja();
          const producto = buscarProducto(venta.producto);
          const total = venta.cantidad * producto.precio;
          return res
            .status(200)
            .json({
              response: `La venta más baja fue de ${venta.cantidad} unidades de ${venta.producto} por un total de ${total}.`,
            });
        }
  
        if (question.toLowerCase().includes("día con menos ventas")) {
          const dia = diaConMenosVentas();
          return res
            .status(200)
            .json({ response: `El día con menos ventas fue el ${dia}.` });
        }
      }
  
      // Mensaje predeterminado para solicitudes no válidas o sin relación con el inventario/ventas
      const mensajesPredeterminados = [
        "Tu solicitud no es aceptada.",
        "Por favor, ingrese una solicitud válida.",
        "Lo siento, no puedo procesar esa solicitud.",
        "No puedo ayudarte con esa solicitud. Intenta algo relacionado con el inventario.",
      ];
  
      // Selecciona un mensaje aleatorio de la lista
      const mensajePredeterminado =
        mensajesPredeterminados[Math.floor(Math.random() * mensajesPredeterminados.length)];
  
      return res.status(200).json({ response: mensajePredeterminado });
    } else {
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }