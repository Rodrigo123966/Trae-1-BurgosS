export default function Formulario({
  formulario,
  roles,
  idEditar,
  mensaje,
  error,
  cambiarCampo,
  guardar,
  cancelarEdicion,
}) {
  return (
    <section className="panel-formulario" id="formulario-users">

      <div className="titulo-panel">
        <h2>
          {idEditar !== null
            ? "Editar usuario"
            : "Registrar usuario"}
        </h2>

        <p>
          Completa los datos correspondientes al usuario.
        </p>
      </div>

      <form onSubmit={guardar} className="formulario">

        <label>
          Nombres
          <input
            type="text"
            name="firstName"
            value={formulario?.firstName || ""}
            onChange={cambiarCampo}
            required
          />
        </label>

        <label>
          Apellidos
          <input
            type="text"
            name="lastName"
            value={formulario?.lastName || ""}
            onChange={cambiarCampo}
            required
          />
        </label>

        <label>
          Correo electrónico
          <input
            type="email"
            name="email"
            value={formulario?.email || ""}
            onChange={cambiarCampo}
            required
          />
        </label>

        <label>
          Teléfono
          <input
            type="tel"
            name="phone"
            value={formulario?.phone || ""}
            onChange={cambiarCampo}
            required
          />
        </label>

        <label>
          Departamento
          <input
            type="text"
            name="department"
            value={formulario?.department || ""}
            onChange={cambiarCampo}
            required
          />
        </label>

        <label>
          Rol
          <select
            name="roleId"
            value={formulario?.roleId || ""}
            onChange={cambiarCampo}
            required
          >
            <option value="">
              Selecciona un rol
            </option>

            {(Array.isArray(roles) ? roles : []).map((rol) => (
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
            value={formulario?.status || "Activo"}
            onChange={cambiarCampo}
            required
          >
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </label>

        <div className="acciones-formulario">

          <button
            className="btn-guardar"
            type="submit"
          >
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
        <p className="mensaje-exito">
          {mensaje}
        </p>
      )}

      {error && (
        <p className="mensaje-error">
          {error}
        </p>
      )}

    </section>
  );
}
