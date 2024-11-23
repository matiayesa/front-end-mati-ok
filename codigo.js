document.getElementById('verifyCodeBtn').addEventListener('click', async () => {
    const email = document.getElementById("inputEmail").value;
    const code = document.getElementById("inputCode").value;

    if (!code) {
        alert("Por favor, ingresa el código de verificación.");
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/user/verifyCode', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, code })
        });

        if (!response.ok) {
            throw new Error("Código incorrecto.");
        }

        const data = await response.json();
        if (data.success) {
            alert("Código verificado correctamente.");
            document.getElementById('codeSection').style.display = 'none';
            document.getElementById('resetSection').style.display = 'block';
            window.location.href = "reset.html";
        } else {
            alert("El código ingresado es incorrecto.");
        }
    } catch (error) {
        console.error(error);
        alert("Hubo un problema al verificar el código.");
    }
});