import { useEffect, useState } from "react";
import Card from "./Card";

import {
  obtenerUsers,
  obtenerRoles,
  guardarUser,
  actualizarUser,
  eliminarUser
} from "../services/UsersServices";

const rolesPredeterminados = [
  { id: 1, name: "Administración" },
  { id: 2, name: "Tecnología" },
];

const formularioVacio = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  department: "",
  roleId: "",
  status: "Activo"
};

export default function Catalogo() {

  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState(rolesPredeterminados);
  const [formulario, setFormulario] = useState(formularioVacio);
  const [idEditar, setIdEditar] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  async function listar() {
    try {
      setCargando(true);
      setError("");

      const respuestaUsers = await obtenerUsers();
      setUsers(respuestaUsers.data || []);

    } catch (err) {
      console.error("Error al cargar usuarios:", err);
      setError("No se pudieron cargar los usuarios.");
    }

    try {
      const respuestaRoles = await obtenerRoles();

      if (Array.isArray(respuestaRoles.data) &&
          respuestaRoles.data.length > 0) {
        setRoles(respuestaRoles.data);
      }

    } catch (err) {
      console.error("Error al cargar roles:", err);
    }

    setCargando(false);
  }

  useEffect(() => {
    listar();
  }, []);

  function cambiarCampo(e) {
    const { name, value } = e.target;

    setFormulario((actual) => ({
      ...actual,
      [name]: value
    }));
  }

  async function guardar(e) {
    e.preventDefault();

    const datos = {
      ...formulario,
      roleId: Number(formulario.roleId)
    };

    try {
      if (idEditar !== null) {
        await actualizarUser(idEditar, datos);
        setMensaje("Usuario actualizado correctamente.");
      } else {
        await guardarUser(datos);
        setMensaje("Usuario registrado correctamente.");
      }

      setError("");
      cancelarEdicion();
      await listar();

    } catch (err) {
      setError(err.message);
      setMensaje("");
    }
  }

  function editar(user) {
    setIdEditar(user.id);

    setFormulario({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      phone: user.phone || "",
      department: user.department || "",
      roleId: String(user.roleId || ""),
      status: user.status || "Activo"
    });

    setMensaje("");

    document.getElementById("formulario-users")?.scrollIntoView({
      behavior: "smooth"
    });
  }

  function cancelarEdicion() {
    setIdEditar(null);
    setFormulario(formularioVacio);
  }

  async function eliminar(id) {
    const confirmar = window.confirm(
      "¿Estás seguro de eliminar este usuario?"
    );

    if (!confirmar) return;

    try {
      await eliminarUser(id);

      setMensaje("Usuario eliminado correctamente.");
      setError("");

      if (idEditar === id) {
        cancelarEdicion();
      }

      await listar();

    } catch (err) {
      setError(err.message);
    }
  }

  const usuariosFiltrados = users.filter((user) =>
    `${user.firstName} ${user.lastName} ${user.email} ${user.department}`
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  return (
    <main className="contenedor">

      <section className="encabezado-catalogo">
        <div>
          <span className="etiqueta">ADMINISTRACIÓN</span>
          <h1>Catálogo de usuarios</h1>
          <p>Gestiona los usuarios registrados en la API de la tienda.</p>
        </div>

        <div className="contador">
          <strong>{users.length}</strong>
          <span>Usuarios registrados</span>
        </div>
      </section>

      <section className="panel-formulario" id="formulario-users">

        <div className="titulo-panel">
          <h2>
            {idEditar !== null ? "Editar usuario" : "Registrar usuario"}
          </h2>

          <p>Completa los datos correspondientes al usuario.</p>
        </div>

        <form onSubmit={guardar} className="formulario">

          <label>
            Nombres
            <input
              name="firstName"
              value={formulario.firstName}
              onChange={cambiarCampo}
              required
            />
          </label>

          <label>
            Apellidos
            <input
              name="lastName"
              value={formulario.lastName}
              onChange={cambiarCampo}
              required
            />
          </label>

          <label>
            Correo electrónico
            <input
              type="email"
              name="email"
              value={formulario.email}
              onChange={cambiarCampo}
              required
            />
          </label>

          <label>
            Teléfono
            <input
              name="phone"
              value={formulario.phone}
              onChange={cambiarCampo}
              required
            />
          </label>

          <label>
            Departamento
            <input
              name="department"
              value={formulario.department}
              onChange={cambiarCampo}
              required
            />
          </label>

          <label>
            Rol

            <select
              name="roleId"
              value={formulario.roleId}
              onChange={cambiarCampo}
              required
            >
              <option value="">Selecciona un rol</option>

              {roles.map((rol) => (
                <option key={rol.id} value={rol.id}>
                  {rol.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Estado

            <select
              name="status"
              value={formulario.status}
              onChange={cambiarCampo}
              required
            >
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </label>

          <div className="acciones-formulario">

            <button className="btn-guardar" type="submit">
              {idEditar !== null
                ? "Guardar cambios"
                : "Registrar usuario"}
            </button>

            {idEditar !== null && (
              <button
                className="btn-cancelar"
                type="button"
                onClick={cancelarEdicion}
              >
                Cancelar
              </button>
            )}

          </div>

        </form>

        {mensaje && (
          <p className="mensaje-exito">{mensaje}</p>
        )}

        {error && (
          <p className="mensaje-error">{error}</p>
        )}

      </section>

      <section className="seccion-listado">

        <div className="barra-listado">
          <div>
            <h2>Usuarios registrados</h2>
            <p>Información obtenida de users.json mediante la API.</p>
          </div>

          <input
            className="buscador"
            placeholder="Buscar usuario..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        {cargando ? (
          <p className="estado-carga">Cargando usuarios...</p>
        ) : usuariosFiltrados.length > 0 ? (

          <div className="catalogo-users">
            {usuariosFiltrados.map((user) => (
              <Card
                key={user.id}
                user={user}
                nombreRol={
                  roles.find(
                    (rol) => Number(rol.id) === Number(user.roleId)
                  )?.name || "Sin rol"
                }
                eliminar={eliminar}
                editar={editar}
              />
            ))}
          </div>

        ) : (
          <p className="estado-carga">
            No se encontraron usuarios.
          </p>
        )}

      </section>

    </main>
  );
}
