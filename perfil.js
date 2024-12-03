document.getElementById('btnPerfil').addEventListener('click', async () => {
    const name = document.getElementById('name').value;
    const birthdate = document.getElementById('birthdate').value;
    const gender = document.getElementById('gender').value;

    // Validar que todos los campos estén completos
    if (!name || !birthdate || !gender) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    // Crear un objeto con los datos del usuario
    const userProfile = {
        name,
        birthdate,
        gender
    };

    try {
        // Enviar los datos al servidor mediante una solicitud POST
        const response = await fetch('http://localhost:3000/profile', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userProfile)
        });

        // Verificar si la respuesta fue exitosa
        if (!response.ok) {
            throw new Error("Error al guardar los datos.");
        }

        const savedData = await response.json();


        alert("Datos guardados exitosamente.");
    } catch (error) {
        console.error("Hubo un error:", error);
        alert("Hubo un problema al guardar los datos.");
    }
});
