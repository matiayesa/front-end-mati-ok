const fondo = document.querySelector(".fondo");
const loginLink = document.querySelector(".login-link");
const registrarlink = document.querySelector(".registrar-link");
const btn = document.querySelector(".btn");
const iconocerrar = document.querySelector(".icono-cerrar");

registrarlink.addEventListener("click", () => {
    fondo.classList.add('active');
});
loginLink.addEventListener("click", () => {
    fondo.classList.remove('active');
});
btn.addEventListener("click", () => {
    fondo.classList.add('active-btn');
});
iconocerrar.addEventListener("click", () => {
    fondo.classList.remove('active-btn');
});