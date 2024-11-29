document.getElementById('verifyCodeBtn').addEventListener('click', async () => {
    const code = document.getElementById("inputCode").value;

    
    if (!code) {
        alert("Por favor, ingresa el código de verificación.");
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/user/verifyCode', {
            method: 'POST',
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('authToken'),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ code })
            
        });

      

        const data = await response.json();
        if (response.ok) {
           
            alert("Código verificado correctamente.");
            window.location.href = "reset.html";
        } else {
            alert("El código ingresado es incorrecto.");
        }
    } catch (error) {
        console.error(error);
        alert("Hubo un problema al verificar el código.");
    }
});