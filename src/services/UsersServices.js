const URL_USERS = "http://localhost:3000/api/users";

export async function obtenerUsers() {
    const response = await fetch(URL_USERS);

    if (!response.ok) {
        throw new Error("Error al cargar los usuarios");
    }

    return await response.json();
}

export async function obtenerRoles() {
    const response = await fetch(URL_ROLES);

    if (!response.ok) {
        throw new Error("Error al cargar los roles");
    }

    return await response.json();
}

export async function guardarUser(usuario) {
    const response = await fetch(URL_USERS, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
    });

    if (!response.ok) {
        throw new Error("Error al registrar el usuario");
    }

    return await response.json();
}

export async function actualizarUser(id, usuario) {
    const response = await fetch(`${URL_USERS}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
    });

    if (!response.ok) {
        throw new Error("Error al actualizar el usuario");
    }

    return await response.json();
}

export async function eliminarUser(id) {
    const response = await fetch(`${URL_USERS}/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        throw new Error("Error al eliminar el usuario");
    }

    return await response.json();
}
