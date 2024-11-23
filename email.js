document.getElementById('sendCodeBtn').addEventListener('click', async () => {
    const email = document.getElementById("inputEmail").value;

    if (!email) {
        alert("Por favor, ingresa tu correo electrónico.");
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/user/mandarMail', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email })
        });

        if (!response.ok) {
            throw new Error("Error al enviar el código de verificación.");
        }

        const data = await response.json();
        if (data.success) {
            alert("Código enviado a tu correo electrónico.");
            document.getElementById('emailSection').style.display = 'none';
            document.getElementById('codeSection').style.display = 'block';
            window.location.href = "codigo.html";
        } else {
            alert("No se pudo enviar el código. Verifica tu correo.");
        }
    } catch (error) {
        console.error(error);
        alert("Hubo un problema al enviar el código.");
    }
});