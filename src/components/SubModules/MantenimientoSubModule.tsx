import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import Modal from "../../components/Modal"; // Para mostrar el modal
import {
  obtenerMantenimientos,
  crearMantenimiento,
  editarMantenimiento,
  eliminarMantenimiento,
} from "../../pages/api/mantenimiento";
import { Mantenimiento } from "../../models/Mantenimiento";
import styles from "../../styles/Modal.module.css";

const MantenimientoSubModule = () => {
  const [mantenimientos, setMantenimientos] = useState<Mantenimiento[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [cedulaRuc, setCedulaRuc] = useState("");
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [fecha, setFecha] = useState("");
  const [busqueda, setBusqueda] = useState(""); // Estado para la búsqueda

  useEffect(() => {
    const fetchMantenimientos = async () => {
      const mantenimientos = await obtenerMantenimientos();
      setMantenimientos(mantenimientos);
    };

    fetchMantenimientos();
  }, []);

  const handleNuevo = () => {
    setEditId(null);
    setCedulaRuc("");
    setNombre("");
    setTelefono("");
    setCorreo("");
    setFecha("");
    setModalOpen(true);
  };

  const handleEditar = (mantenimiento: Mantenimiento) => {
    setEditId(mantenimiento.id);
    setCedulaRuc(mantenimiento.cedulaRuc);
    setNombre(mantenimiento.nombre);
    setTelefono(mantenimiento.telefono);
    setCorreo(mantenimiento.correo);
    setFecha(mantenimiento.fecha);
    setModalOpen(true);
  };

  const handleEliminar = async (id: number) => {
    await eliminarMantenimiento(id);
    setMantenimientos(
      mantenimientos.filter((mantenimiento) => mantenimiento.id !== id)
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editId !== null) {
      const mantenimientoEditado = await editarMantenimiento(editId, {
        id: editId,
        cedulaRuc,
        nombre,
        telefono,
        correo,
        fecha,
      });

      if (mantenimientoEditado !== null) {
        setMantenimientos(
          mantenimientos.map((v) =>
            v.id === editId ? mantenimientoEditado : v
          )
        );
      }
    } else {
      const nuevoMantenimiento = await crearMantenimiento({
        id: mantenimientos.length + 1,
        cedulaRuc,
        nombre,
        telefono,
        correo,
        fecha,
      });

      if (nuevoMantenimiento !== null) {
        setMantenimientos([...mantenimientos, nuevoMantenimiento]);
      }
    }

    setModalOpen(false);
  };

  // Filtrar ventas según búsqueda
  const mantenimientoFiltradas = mantenimientos.filter(
    (mantenimiento) =>
      mantenimiento.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      mantenimiento.cedulaRuc.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Definimos las columnas para la tabla
  const columns = [
    { header: "Cedula | RUC", accessor: "cedulaRuc" },
    { header: "Nombre", accessor: "nombre" },
    { header: "Telefono", accessor: "telefono" },
    { header: "Correo", accessor: "correo" },
    { header: "Fecha", accessor: "fecha" },
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
        data={mantenimientoFiltradas}
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
              value={cedulaRuc}
              onChange={(e) => setCedulaRuc(e.target.value)}
              placeholder="cedula | ruc"
              className={styles.modalInput}
              required
            />
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Nombre"
              className={styles.modalInput}
              required
            />
            <input
              type="text"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              placeholder="telefono"
              className={styles.modalInput}
              required
            />
            <input
              type="text"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="Correo"
              className={styles.modalInput}
              required
            />
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className={styles.modalInput}
              required
            />
            <button type="submit" className={styles.modalButton}>
              {editId ? "Guardar Cambios" : "Crear Mantenimiento"}
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default MantenimientoSubModule;
