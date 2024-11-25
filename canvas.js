const mainCanvas = document.getElementById("main-canvas");
const context = mainCanvas.getContext("2d");

let initialX;
let initialY;
let correccionX = 0;
let correccionY = 0;

let posicion = mainCanvas.getBoundingClientRect();
correccionX = posicion.x;
correccionY = posicion.y;

const dibujar = (cursorX, cursorY) => {
  context.beginPath();
  context.moveTo(initialX, initialY);
  context.lineWidth = 10;
  context.strokeStyle = "rgba(255, 255, 255, 255)";
  context.lineCap = "round";
  context.lineJoin = "round";
  context.lineTo(cursorX, cursorY);
  context.stroke();

  initialX = cursorX;
  initialY = cursorY;
};

const mouseDown = (evt) => {
  evt.preventDefault();
  if ( evt.changedTouches === undefined) {
    initialX = evt.offsetX;
    initialY = evt.offsetY;
  }else{
    //evita desfase al dibujar
    initialX = evt.changedTouches[0].pageX - correccionX;
    initialY = evt.changedTouches[0].pageY - correccionY;
  }
  dibujar(initialX, initialY);
  mainCanvas.addEventListener("mousemove", mouseMoving);
  mainCanvas.addEventListener('touchmove', mouseMoving);
};

const mouseMoving = (evt) => {
  evt.preventDefault();
  if ( evt.changedTouches === undefined) {
    dibujar(evt.offsetX, evt.offsetY);
  }else{
    dibujar( evt.changedTouches[0].pageX - correccionX  , evt.changedTouches[0].pageY - correccionY );
  }
};

const mouseUp = () => {
  mainCanvas.removeEventListener("mousemove", mouseMoving);
  mainCanvas.removeEventListener("touchmove", mouseMoving);
};

mainCanvas.addEventListener("mousedown", mouseDown);
mainCanvas.addEventListener("mouseup", mouseUp);

//pantallas tactiles
mainCanvas.addEventListener('touchstart', mouseDown);
mainCanvas.addEventListener('touchend', mouseUp);


document.getElementById("btnSubmit").addEventListener("click", async () => {

  mainCanvas.toBlob(async (file) => {
    const fd = new FormData;

    fd.append('file', file);
  
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
  })

});



