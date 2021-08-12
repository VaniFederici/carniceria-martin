function cargarProductos() {
  $.getJSON("data/productos.json", (response) => {
    listaProductos = response;
    const urlParams = new URLSearchParams(window.location.search);
    const categoria = urlParams.get("categoria");
    const buscar = urlParams.get("buscar");

    dibujarProductos(categoria, buscar);
  });
}

function dibujarProductos(categoria, buscar) {
  const productsBox = document.getElementById("products-box");
  productsBox.innerHTML = ``;
  let noHayProductos = true;
  listaProductos.map((producto) => {
    let mostrarProducto = false;
    if (buscar) {
      mostrarProducto =
        producto.nombre.toLowerCase().indexOf(buscar.toLowerCase()) !== -1;
    } else if (
      producto.categoria == categoria ||
      categoria === "todos" ||
      !categoria
    ) {
      mostrarProducto = true;
    }

    if (mostrarProducto) {
      noHayProductos = false;
      productsBox.innerHTML += `
      <div class= "product-box col-sm-12 col-md-4">
        <div class="product-box__container">
          <img class="product-img" src=${producto.img}>
          <div class="product-detail"> 
            <p> ${producto.nombre}</p>    
            <h5>$${producto.precio}</h5> 
            <span>Por Kg</span>
            <button class="product-box__button">
              <a class="button-a" target="_blank"
              href="https://api.whatsapp.com/send?phone=5493815039017&text=Hola!&nbsp;quiero&nbsp;hacer&nbsp;un&nbsp;pedido">Pedí aquí
              </a>
            </button>
          </div>
        </div>
      </div>`;
    }
  });
  if (noHayProductos) {
    productsBox.innerHTML = `<div class= "product-box col-sm-12 col-md-4">No se han encontrado productos, intente buscando por categorias o realizando una nueva búsqueda</div>`;
  }
}

function enviarFormulario() {
  debugger;
  let mensaje;
  let nombre = document.querySelector("#inputNombre").value;
  let mail = document.querySelector("#inputEmail").value;
  let tel = document.querySelector("#inputTel").value;
  let msj = document.querySelector("#inputMsj").value;
  mensaje =
    encodeURI(`Hola! mi nombre es ${nombre}, mi correo electronico es ${mail},
  mi teléfono es: ${tel} y esta es mi consulta: ${msj}`);
  let url = `https://api.whatsapp.com/send?phone=5493815039017&text=${mensaje}`;
  window.open(url, "_blank");
}

$(document).ready(function () {
  listaProductos = [];
  if (window.location.pathname.endsWith("/productos.html")) {
    cargarProductos();
  }
});
