
export default function Card({ user, nombreRol, eliminar, editar }) {

  if (!user) return null;

  return (
    <article className="user-card">

      <div className="card-top">

        <div className="avatar">
          {user.firstName?.charAt(0) || ""}
          {user.lastName?.charAt(0) || ""}
        </div>

        <span className={`estado ${
          user.status === "Activo" ? "activo" : "inactivo"
        }`}>
          {user.status || "Sin estado"}
        </span>

      </div>

      <div className="user-info">

        <span className="user-id">
          USUARIO #{user.id}
        </span>

        <h3>
          {user.firstName} {user.lastName}
        </h3>

        <p>
          <strong>Correo:</strong> {user.email}
        </p>

        <p>
          <strong>Teléfono:</strong> {user.phone}
        </p>

        <p>
          <strong>Departamento:</strong> {user.department}
        </p>

        <p>
          <strong>Rol:</strong> {nombreRol || `Rol ${user.roleId}`}
        </p>

      </div>

      <div className="card-actions">

        <button
          className="btn-editar"
          type="button"
          onClick={() => editar(user)}
        >
          Editar
        </button>

        <button
          className="btn-eliminar"
          type="button"
          onClick={() => eliminar(user.id)}
        >
          Eliminar
        </button>

      </div>

    </article>
  );
}
