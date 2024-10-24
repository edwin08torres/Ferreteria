import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import Modal from "../../components/Modal"; // Para mostrar el modal
import {
  crearProducto,
  editarProducto,
  eliminarProducto,
  obtenerProductos,
} from "../../pages/Api/producto"; // API para obtener los productos
import { Producto } from "@/models/producto";
import styles from "../../styles/Modal.module.css"; // Estilos para el modal

const ProductoSubModule = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [precio, setPrecio] = useState("");
  const [busqueda, setBusqueda] = useState(""); // Estado para la búsqueda

  useEffect(() => {
    const fetchProductos = async () => {
      const productos = await obtenerProductos();
      setProductos(productos);
    };

    fetchProductos();
  }, []);

  const handleNuevo = () => {
    setEditId(null);
    setNombre("");
    setCantidad("");
    setPrecio("");
    setModalOpen(true);
  };

  const handleEditar = (producto: Producto) => {
    setEditId(producto.id);
    setNombre(producto.nombre);
    setCantidad(producto.cantidad.toString());
    setPrecio(producto.precio.toString());
    setModalOpen(true);
  };

  const handleEliminar = async (id: number) => {
    await eliminarProducto(id);
    setProductos(productos.filter((prd) => prd.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editId !== null) {
      const productoEditado = await editarProducto(editId, {
        id: editId,
        nombre,
        cantidad: Number(cantidad),
        precio: Number(precio),
      });

      if (productoEditado !== null) {
        setProductos(
          productos.map((v) => (v.id === editId ? productoEditado : v))
        );
      }
    } else {
      const nuevoProducto = await crearProducto({
        id: productos.length + 1,
        nombre,
        cantidad: Number(cantidad),
        precio: Number(cantidad),
      });

      if (nuevoProducto !== null) {
        setProductos([...productos, nuevoProducto]);
      }
    }

    setModalOpen(false);
  };

  // Filtrar ventas según búsqueda
  const productosFiltradas = productos.filter(
    (prd) =>
      prd.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      prd.precio.toString().toLowerCase().includes(busqueda.toLowerCase()) || 
      prd.cantidad.toString().toLowerCase().includes(busqueda.toLowerCase()) 
  );

  // Definimos las columnas para la tabla
  const columns = [
    { header: "ID Producto", accessor: "id" },
    { header: "Nombre Producto", accessor: "nombre" },
    { header: "Cantidad", accessor: "cantidad" },
    { header: "Precio", accessor: "precio" },
  ];

  // Retornamos solo los datos y las columnas hacia el componente Table

  return (
    <div>
      {/* Contenedor para búsqueda y botón "Nuevo" */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "20px",
          gap: "2rem",
        }}
      >
        <input
          type="text"
          placeholder="Buscar en ventas"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{ padding: "8px", fontSize: "14px", width: "200px" }}
        />
        <button onClick={handleNuevo}>Nuevo</button>
      </div>

      <Table
        columns={columns}
        data={productosFiltradas}
        onEdit={handleEditar}
        onDelete={handleEliminar}
      />

      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <h2 className={styles.modalTitle}>
            {editId ? "Editar Venta" : "Nueva Venta"}
          </h2>
          <form onSubmit={handleSubmit} className={styles.modalForm}>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Nombre"
              className={styles.modalInput}
              required
            />
            <input
              type="number"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              placeholder="Cantidad"
              className={styles.modalInput}
              required
            />
            <input
              type="texto"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              placeholder="Precio"
              className={styles.modalInput}
              required
            />
            <button type="submit" className={styles.modalButton}>
              {editId ? "Guardar Cambios" : "Crear Producto"}
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default ProductoSubModule;
