// ETAPA 1 CREAR PRODUCTOS
const productos = JSON.parse(localStorage.getItem("productos")) || [];
const crearProductos = (e) => {
  e.preventDefault();
  const id = new Date().getTime();
  const nombre = document.getElementById("nombreProduct").value;
  const detalle = document.getElementById("detalleProduct").value;
  const imagen = document.getElementById("imagenProduct").value;
  const precio = document.getElementById("precioProduct").value;

  const items = {
    id,
    nombre,
    detalle,
    imagen,
    precio,
  };

  productos.push(items);
  localStorage.setItem("productos", JSON.stringify(productos));
  // LIMPIEZA DEL FORMULARIO
  document.getElementById("formulario").reset();
  document.getElementById("nombreProduct").focus();
  cargarTabla();
};
document.getElementById("formulario");
document.addEventListener("submit", crearProductos);

const myModal = new bootstrap.Modal(document.getElementById("updateModal"));

const abrirModal = (index) => {
  document.querySelector(".modal-body").innerHTML = " ";
  const updateFormulario = document.createElement("form");
  const contenidoFormulario = /* HTML */ `<div class="mb-3">
      <label class="form-label">Nombre</label>
      <input
        class="form-control"
        id="nombreUpdate"
        value="${productos[index].nombre}"
      />
    </div>
    <div class="mb-3">
      <label class="form-label">Detalle</label>
      <textarea class="form-control" id="detalleUpdate" rows="3">
${productos[index].detalle}</textarea
      >
    </div>
    <div class="row">
      <div class="col">
        <div class="mb-3">
          <div class="d-flex justify-content-between mb-3">
            <label class="form-label">URL Imagen</label>
            <input
              class="form-control"
              id="imagenUpdate"
              value="${productos[index].imagen}"
            />
          </div>
          <div>
            <label class="form-label">Precio</label>
            <input
              type="number"
              class="form-control"
              id="precioUpdate"
              value="${productos[index].precio}"
            />
          </div>
        </div>
        <div class="d-flex justify-content-end">
          <button class="btn btn-success">Enviar</button>
        </div>
      </div>
    </div>`;

  updateFormulario.innerHTML = contenidoFormulario;
  document.querySelector(".modal-body").append(updateFormulario);
  myModal.show();
};

//ETAPA 2 CREAR UN CUERPO DE TABLA PARA AGREGAR PRODUCTOS
const cuerpoTabla = document.getElementById("cuerpoTabla");

const cargarTabla = () => {
  cuerpoTabla.innerHTML = " ";
  productos.forEach((producto, index) => {
    const fila = document.createElement("tr");
    const celdas = /* HTML */ `
      <th scope="row">${producto.id}</th>
      <td>${producto.nombre}</td>
      <td>${producto.detalle}</td>
      <td>${producto.precio}</td>
      <td
      <button class="btn btn-danger" onclick="borrarProductos(${index})">X</button>
      </td>
      <td
       <button class="btn btn-warning" onclick="abrirModal(${index})">&#9998</button>
      </td>
     
      `;

    fila.innerHTML = celdas;
    cuerpoTabla.append(fila);
  });
};
cargarTabla();
//ETAPA 3 BORRAR PRODUCTOS
const borrarProductos = (index) => {
  let validar = confirm(
    `Esta seguro que quiere borrar ${productos[index].nombre}`
  );
  if (validar) {
    productos.splice(index, 1);
    localStorage.setItem("productos", JSON.stringify(productos));
    cargarTabla();
  }
};
//Actualizar Productos

const actualizarProductos = (index) => {
  productos[index].nombre = document.querySelector("#nombreUpdate").value;
  productos[index].detale = document.querySelector("#detaleUpdate").value;
  productos[index].imagen = document.querySelector("#imagenUpdate").value;
  productos[index].precio = document.querySelector("#precioUpdate").value;
  localStorage.setItem("productos", JSON.stringify(productos));
  cargarTabla();
  myModal.hide();
  // LIMPIEZA DEL FORMULARIO
};
