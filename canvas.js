const mainCanvas = document.getElementById("main-canvas");
const context = mainCanvas.getContext("2d");


let lastX;
let lastY;
let lineWidth = 5; // Tamaño inicial del trazo
let strokeColor = "rgba(255, 255, 255, 1)"; // Color inicial del trazo


// const sizeSlider = document.getElementById("size-slider");
// const colorPicker = document.getElementById("color-picker");
// const downloadBtn = document.getElementById("download-btn");


// sizeSlider.addEventListener("input", () => {
//   lineWidth = sizeSlider.value;
// });


// colorPicker.addEventListener("input", () => {
//   strokeColor = colorPicker.value;
// });


const canvasStart = mainCanvas.getBoundingClientRect();

const dibujar = (cursorX, cursorY) => {
  context.beginPath();
  context.moveTo(lastX, lastY);
  context.lineWidth = lineWidth; 
  context.strokeStyle = strokeColor; 
  context.lineCap = "round";
  context.lineJoin = "round";
  context.lineTo(cursorX, cursorY);
  context.stroke();

  lastX = cursorX;
  lastY = cursorY;
};

// Eventos de mouse
const mouseMove = (evt) => {
  dibujar(evt.offsetX, evt.offsetY);
};

mainCanvas.addEventListener("mousedown", (evt) => {
  lastX = evt.offsetX;
  lastY = evt.offsetY;
  mainCanvas.addEventListener("mousemove", mouseMove);
});

mainCanvas.addEventListener("mouseup", (evt) => {
  dibujar(evt.offsetX, evt.offsetY);
  mainCanvas.removeEventListener("mousemove", mouseMove);
});

// Eventos de touch
const touchMove = (evt) => {
  evt.preventDefault(); // Evita que se mueva el navegador con el dedo
  dibujar(
    evt.changedTouches[0].pageX - canvasStart.x,
    evt.changedTouches[0].pageY - canvasStart.y
  );
};

mainCanvas.addEventListener("touchstart", (evt) => {
  evt.preventDefault(); 
  lastX = evt.changedTouches[0].pageX - canvasStart.x; 
  lastY = evt.changedTouches[0].pageY - canvasStart.y;
  mainCanvas.addEventListener("touchmove", touchMove);
});

mainCanvas.addEventListener("touchend", (evt) => {
  dibujar(
    evt.changedTouches[0].pageX - canvasStart.x,
    evt.changedTouches[0].pageY - canvasStart.y
  );
  mainCanvas.removeEventListener("touchmove", touchMove);
});

document.getElementById("btnSubmit").addEventListener("click", async () => {
  mainCanvas.toBlob(async (file) => {
    const fd = new FormData();

    fd.append("file", file);

    try {
      const response = await fetch("http://localhost:3000/drawing/upload", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("authToken"),
        },
        body: fd,
      });

      const data = await response.json();

      if (!response.ok) {
        if (data && data.error) {
          alert(data.error);
          return;
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
});

// Botón para descargar imagen como archivo PNG
// downloadBtn.addEventListener("click", () => {
//   const link = document.createElement("a");
//   link.download = "canvas-image.png";
//   link.href = mainCanvas.toDataURL();
//   link.click();
// });
