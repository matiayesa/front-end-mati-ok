document.getElementById("btnSubmit").addEventListener("click", async () => {

  const fd = new FormData;

  fd.append('file', document.getElementById("image").files[0]);

  try {
    const response = await fetch('http://localhost:3000/drawing/upload', {
        method: 'POST',
        headers: {
            "Authorization": "Bearer " + localStorage.getItem('authToken')
        },
        body: fd,
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
            throw new Error("Error subiendo archivo");
        }
    }

    window.location.href = "resultados.html";

  } catch (error) {
      console.log(error);
      alert("Hubo un problema subiendo la imagen");
  }

});



