import React, { useState, useEffect } from "react";
import Table from "../../components/Table";
import Modal from "../../components/Modal"; // Para mostrar el modal
import {
  obtenerVentas,
  crearVenta,
  editarVenta,
  eliminarVenta,
} from "../../pages/api/ventas";
import { Venta } from "../../models/venta";
import styles from "../../styles/Modal.module.css"; // Estilos para el modal

const VentaSubModule = () => {
  const [ventas, setVentas] = useState<Venta[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [cliente, setCliente] = useState("");
  const [producto, setProducto] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [fechaVenta, setFechaVenta] = useState("");
  const [busqueda, setBusqueda] = useState(""); // Estado para la búsqueda

  useEffect(() => {
    const fetchVentas = async () => {
      const data = await obtenerVentas();
      setVentas(data);
    };
    fetchVentas();
  }, []);

  const handleNuevo = () => {
    setEditId(null);
    setCliente("");
    setProducto("");
    setCantidad("");
    setFechaVenta("");
    setModalOpen(true);
  };

  const handleEditar = (venta: Venta) => {
    setEditId(venta.id);
    setCliente(venta.cliente);
    setProducto(venta.producto);
    setCantidad(venta.cantidad.toString());
    setFechaVenta(venta.fechaVenta);
    setModalOpen(true);
  };

  const handleEliminar = async (id: number) => {
    await eliminarVenta(id);
    setVentas(ventas.filter((venta) => venta.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editId !== null) {
      const ventaEditada = await editarVenta(editId, {
        id: editId,
        cliente,
        producto,
        cantidad: Number(cantidad),
        fechaVenta,
      });

      if (ventaEditada !== null) {
        setVentas(ventas.map((v) => (v.id === editId ? ventaEditada : v)));
      }
    } else {
      const nuevaVenta = await crearVenta({
        id: ventas.length + 1,
        cliente,
        producto,
        cantidad: Number(cantidad),
        fechaVenta,
      });

      if (nuevaVenta !== null) {
        setVentas([...ventas, nuevaVenta]);
      }
    }

    setModalOpen(false);
  };

  // Filtrar ventas según búsqueda
  const ventasFiltradas = ventas.filter(
    (venta) =>
      venta.cliente.toLowerCase().includes(busqueda.toLowerCase()) ||
      venta.producto.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Columnas de la tabla
  const columns = [
    { header: "ID", accessor: "id" },
    { header: "Cliente", accessor: "cliente" },
    { header: "Producto", accessor: "producto" },
    { header: "Cantidad", accessor: "cantidad" },
    { header: "Fecha Venta", accessor: "fechaVenta" },
  ];

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
        data={ventasFiltradas}
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
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
              placeholder="Cliente"
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
              value={fechaVenta}
              onChange={(e) => setFechaVenta(e.target.value)}
              className={styles.modalInput}
              required
            />
            <button type="submit" className={styles.modalButton}>
              {editId ? "Guardar Cambios" : "Crear Venta"}
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default VentaSubModule;
