document.getElementById('resetPasswordBtn').addEventListener('click', async () => {
    const email = document.getElementById("inputEmail").value;
    const newPassword = document.getElementById("passwordId").value;
    const confirmPassword = document.getElementById("passwordId2").value;

    if ( !email |!newPassword || !confirmPassword) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    if (newPassword !== confirmPassword) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/user/resetPassword', {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, nuevaContrasena: newPassword })
        });

        if (!response.ok) {
            throw new Error("Error al restablecer la contraseña.");
        }

        const data = await response.json();
        if (data.success) {
            alert("Contraseña restablecida con éxito.");
            window.location.href = "login.html";
        } else {
            alert("No se pudo restablecer la contraseña.");
        }
    } catch (error) {
        console.error(error);
        alert("Hubo un problema al restablecer la contraseña.");
    }
});