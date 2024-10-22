// src/models/compra.ts
export interface Compra {
    id: number;
    proveedor: string;
    producto: string;
    cantidad: number;
    fechaCompra: string; // Fecha en formato ISO o cualquier formato adecuado
  }
  