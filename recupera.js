document.getElementById('btnReestablecer').addEventListener('click', async () => {
    const username = document.getElementById("username").value;  // Campo para el nombre de usuario
    const email = document.getElementById("inputEmail").value;   // Campo para el correo electrónico
    const password = document.getElementById("passwordId").value;  // Campo para la nueva contraseña
    const passwordConfirm = document.getElementById("passwordId2").value;  // Campo para confirmar la contraseña

    // Verifica que los campos no estén vacíos
    if (!username || !email || !password || !passwordConfirm) {
        alert("Completa todos los campos para restablecer la contraseña");
        return;
    }

    // Verifica que las contraseñas coincidan
    if (password !== passwordConfirm) {
        alert("Las contraseñas no coinciden, por favor intenta nuevamente.");
        return;
    }

    // Prepara los datos para enviarlos al servidor
    const infoPersona = {
        nombre: username,    // Nombre de usuario
        email: email,        // Correo electrónico
        nuevaContrasena: password,  // Nueva contraseña
    };

    try {
        const response = await fetch('http://localhost:3000/user/resetPassword', {  // Cambia esta URL según tu API
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(infoPersona),
        });

        // Si la respuesta no es OK, lanza un error
        if (!response.ok) {
            throw new Error("Error al restablecer la contraseña");
        }

        const data = await response.json();

        // Si todo es exitoso, muestra un mensaje y redirige al login
        if (data.success) {
            alert("Se ha restablecido la contraseña exitosamente.");
            window.location.href = "login.html";  // Redirige a la página de login
        } else {
            alert("Error al restablecer la contraseña.");
        }
    } catch (error) {
        console.log(error);
        alert("Hubo un problema al restablecer la contraseña.");
    }
});
