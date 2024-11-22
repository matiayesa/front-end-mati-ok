document.getElementById('btnLogin').addEventListener('click', async () => {
    
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    //const btnLogin = document.getElementById("btnLogin");

    const infoPersona = {
        nombre: username,
        contraseña: password
    };

    if(!username ||!password){
        alert("Completa los campos para Iniciar Sesión");
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/user/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(infoPersona),
        });

        if (!response.ok) {
            throw new Error("Error en el login");
        }

        const data = await response.json();

        if (data.token) {
            // Guardar el token en localStorage
            localStorage.setItem('authToken', data.token);
            console.log(data.token);
            alert("Has iniciado sesion exitosamente!")
            return window.location.href = "seleccion.html";
        
            } 
            else {
            alert("Error: No se recibió un token de autenticación.");
        }
    } catch (error) {
        console.log(error);
        alert("Hubo un problema con el login");
    }
});