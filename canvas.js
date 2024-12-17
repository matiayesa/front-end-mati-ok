const mainCanvas = document.getElementById("main-canvas");
const context = mainCanvas.getContext("2d");


let initialX;
let initialY;
let correccionX = 0;
let correccionY = 0;
let lineWidth = 5; // Tamaño inicial del trazo
let strokeColor = "rgba(255, 255, 255, 1)"; // Color inicial del trazo


const sizeSlider = document.getElementById("size-slider");
const colorPicker = document.getElementById("color-picker");
const downloadBtn = document.getElementById("download-btn");


sizeSlider.addEventListener("input", () => {
  lineWidth = sizeSlider.value;
});


colorPicker.addEventListener("input", () => {
  strokeColor = colorPicker.value;
});


let posicion = mainCanvas.getBoundingClientRect();
correccionX = posicion.x;
correccionY = posicion.y;


const dibujar = (cursorX, cursorY) => {
  context.beginPath();
  context.moveTo(initialX, initialY);
  context.lineWidth = lineWidth; 
  context.strokeStyle = strokeColor; 
  context.lineCap = "round";
  context.lineJoin = "round";
  context.lineTo(cursorX, cursorY);
  context.stroke();

  initialX = cursorX;
  initialY = cursorY;
};


const mouseDown = (evt) => {
  evt.preventDefault();
  if (evt.changedTouches === undefined) {
    initialX = evt.offsetX;
    initialY = evt.offsetY;
  } else {
    
    initialX = evt.changedTouches[0].pageX - correccionX;
    initialY = evt.changedTouches[0].pageY - correccionY;
  }
  dibujar(initialX, initialY);
  mainCanvas.addEventListener("mousemove", mouseMoving);
  mainCanvas.addEventListener("touchmove", mouseMoving);
};


const mouseMoving = (evt) => {
  evt.preventDefault();
  if (evt.changedTouches === undefined) {
    dibujar(evt.offsetX, evt.offsetY);
  } else {
    dibujar(
      evt.changedTouches[0].pageX - correccionX,
      evt.changedTouches[0].pageY - correccionY
    );
  }
};


const mouseUp = () => {
  mainCanvas.removeEventListener("mousemove", mouseMoving);
  mainCanvas.removeEventListener("touchmove", mouseMoving);
};

mainCanvas.addEventListener("mousedown", mouseDown);
mainCanvas.addEventListener("mouseup", mouseUp);


mainCanvas.addEventListener("touchstart", mouseDown);
mainCanvas.addEventListener("touchend", mouseUp);


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

      let data;
      try {
        data = await response.json();
      } catch (err) {
        console.log(err);
      }

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
downloadBtn.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "canvas-image.png";
  link.href = mainCanvas.toDataURL();
  link.click();
});
