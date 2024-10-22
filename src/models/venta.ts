// src/models/venta.ts
export interface Venta {
    id: number;
    cliente: string;
    producto: string;
    cantidad: number;
    fechaVenta: string; // Fecha en formato ISO o cualquier formato adecuado
  }
  