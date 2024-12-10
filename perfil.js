document.getElementById('saveButton').addEventListener('click', async () => {
    const name = document.getElementById('name').value;
    const birthdate = document.getElementById('birthdate').value;
    const gender = document.getElementById('gender').value;

    // Validar que todos los campos estén completos
    if (!name || !birthdate || !gender) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    const userProfile = { name, birthdate, gender };

    try {
        // Enviar los datos al servidor
        const response = await fetch('http://localhost:3000/sendprofile', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userProfile)
        });

        if (!response.ok) {
            throw new Error("Error al guardar los datos.");
        }

        const savedData = await response.json();

        // Guardar en localStorage
        localStorage.setItem('userProfile', JSON.stringify(savedData));

        // Actualizar los valores directamente en los campos del formulario
        document.getElementById('name').value = savedData.name;
        document.getElementById('birthdate').value = savedData.birthdate;
        document.getElementById('gender').value = savedData.gender;

        alert("Datos guardados exitosamente.");
    } catch (error) {
        console.error("Hubo un error:", error);
        alert("Hubo un problema al guardar los datos.");
    }
});

