document.getElementById('btnRegister').addEventListener('click', async () => {
    
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const infoPersona = {
        email,
        nombre: username,
        contraseña: password
    };

    if(!username ||!password || !email){
        alert("Completa los campos para registrarse");
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/user/newuser', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(infoPersona),
        });

        let data;
        try {
            data = await response.json();
        } catch {}

        if (!response.ok) {
            if (data && data.error) {
                alert(data.error);
                return
            } else {
                throw new Error("Error en la registración");
            }
        }

        alert("Registración exitosa");
        window.location.href = "login.html";

    } catch (error) {
        console.log(error);
        alert("Hubo un problema con la registración");
    }
});