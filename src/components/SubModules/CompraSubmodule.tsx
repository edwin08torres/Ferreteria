import React, { useState, useEffect } from "react";
import Table from "../../components/Table";
import Modal from "../../components/Modal"; // Para mostrar el modal
import {
  obtenerCompras,
  crearCompra,
  editarCompra,
  eliminarCompra,
} from "../../pages/Api/compras";
import { Compra } from "../../models/Compra";
import styles from "../../styles/Modal.module.css"; // Estilos para el modal

const CompraSubModule = () => {
  const [compras, setCompras] = useState<Compra[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [proveedor, setProveedor] = useState("");
  const [producto, setProducto] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [fechaCompra, setFechaCompra] = useState("");
  const [busqueda, setBusqueda] = useState(""); // Estado para la búsqueda

  useEffect(() => {
    const fetchCompras = async () => {
      const data = await obtenerCompras();
      setCompras(data);
    };
    fetchCompras();
  }, []);

  const handleNuevo = () => {
    setEditId(null);
    setProveedor("");
    setProducto("");
    setCantidad("");
    setFechaCompra("");
    setModalOpen(true);
  };

  const handleEditar = (compra: Compra) => {
    setEditId(compra.id);
    setProveedor(compra.proveedor);
    setProducto(compra.producto);
    setCantidad(compra.cantidad.toString());
    setFechaCompra(compra.fechaCompra);
    setModalOpen(true);
  };

  const handleEliminar = async (id: number) => {
    await eliminarCompra(id);
    setCompras(compras.filter((compra) => compra.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editId !== null) {
      // Editar compra
      const compraEditada = await editarCompra(editId, {
        id: editId,
        proveedor,
        producto,
        cantidad: Number(cantidad),
        fechaCompra,
      });

      if (compraEditada !== null) {
        setCompras(compras.map((v) => (v.id === editId ? compraEditada : v)));
      }
    } else {
      // Crear nueva compra
      const nuevaCompra = await crearCompra({
        id: compras.length + 1,
        proveedor,
        producto,
        cantidad: Number(cantidad),
        fechaCompra,
      });

      if (nuevaCompra !== null) {
        setCompras([...compras, nuevaCompra]);
      }
    }

    setModalOpen(false);
  };

  // Filtrar ventas según búsqueda
  const comrpasFiltradas = compras.filter(
    (compra) =>
      compra.producto.toLowerCase().includes(busqueda.toLowerCase()) ||
      compra.proveedor.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Columnas de la tabla
  const columns = [
    { header: "ID", accessor: "id" },
    { header: "Proveedor", accessor: "proveedor" },
    { header: "Producto", accessor: "producto" },
    { header: "Cantidad", accessor: "cantidad" },
    { header: "Fecha Compra", accessor: "fechaCompra" },
  ];

  return (
    <div>
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
          placeholder="Buscar en Compras"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{ padding: "8px", fontSize: "14px", width: "200px" }}
          className="search-input"
        />
        <button onClick={handleNuevo}>Nuevo</button>
      </div>

      <Table
        columns={columns}
        data={comrpasFiltradas}
        onEdit={handleEditar}
        onDelete={handleEliminar}
      />

      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <h2 className={styles.modalTitle}>
            {editId ? "Editar Compra" : "Nueva Compra"}
          </h2>
          <form onSubmit={handleSubmit} className={styles.modalForm}>
            <input
              type="text"
              value={proveedor}
              onChange={(e) => setProveedor(e.target.value)}
              placeholder="Proveedor"
              className={styles.modalInput}
              required
            />
            <input
              type="text"
              value={producto}
              onChange={(e) => setProducto(e.target.value)}
              placeholder="Producto"
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
              type="date"
              value={fechaCompra}
              onChange={(e) => setFechaCompra(e.target.value)}
              className={styles.modalInput}
              required
            />
            <button type="submit" className={styles.modalButton}>
              {editId ? "Guardar Cambios" : "Crear Compra"}
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default CompraSubModule;
