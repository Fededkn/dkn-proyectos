let arrayActivos = [];

class Activo {
  constructor(ticker, nombre, cantidadPapeles, capitalInvertido) {
      this.ticker = ticker;
      this.nombre = nombre;
      this.cantidadPapeles = cantidadPapeles;
      this.capitalInvertido = capitalInvertido;
      this.precioPromedioCompra = capitalInvertido / cantidadPapeles;
  }
}

function construirDivActivo(activo) {
  // Crear un nuevo div
  const divActivo = document.createElement("div");
  divActivo.classList.add("activo");

  // Construir el contenido del div con los datos del activo
  divActivo.innerHTML = `
      <p>${activo.ticker}</p>
      <p>Nombre: ${activo.nombre}</p>
      <p>Cantidad de Papeles: ${activo.cantidadPapeles}</p>
      <p>Precio Promedio de Compra: ${activo.precioPromedioCompra.toFixed(2)}</p>
      <p>Capital Invertido: ${activo.capitalInvertido}</p>
      <button class="btnEliminar" indiceActivo="${arrayActivos.length}">Eliminar</button>
  `;

  // Agregar el div al contenedor de la lista de activos
  const listaActivos = document.getElementById("listaActivos");
  listaActivos.appendChild(divActivo);

  // Agregar el evento de click al botón "Eliminar"
  const btnEliminar = divActivo.querySelector(".btnEliminar");
  btnEliminar.addEventListener("click", eliminarActivo);

  // Actualizar el total invertido
  calcularTotalInvertido();
}

// Función para eliminar un activo
function eliminarActivo() {
  // Obtener el índice del activo a eliminar del atributo indiceActivo del botón
  const indiceActivo = parseInt(this.getAttribute("indiceActivo"));

  // Eliminar el activo del array
  arrayActivos.splice(indiceActivo, 1);

  // Actualizar la lista de activos en el HTML
  mostrarActivos();

  // Actualizar el total invertido
  calcularTotalInvertido();
}

// Función para mostrar los activos en el HTML
function mostrarActivos() {
  const listaActivos = document.getElementById("listaActivos");
  listaActivos.innerHTML = "";

  arrayActivos.forEach((activo, index) => {
      // Crear un nuevo div
      const divActivo = document.createElement("div");
      divActivo.classList.add("activo");

      // Construir el contenido del div con los datos del activo
      divActivo.innerHTML = `
      <span>${activo.ticker}</span>
      <span>Nombre: ${activo.nombre}</span>
      <span>Cantidad de Papeles: ${activo.cantidadPapeles}</span>
      <span>Precio Promedio de Compra: ${activo.precioPromedioCompra.toFixed(2)}</span>
      <span>Capital Invertido: ${activo.capitalInvertido}</span>
      <button class="btnEliminar" indiceActivo="${index}">Eliminar</button>
  `;

      // Agregar el div al contenedor de la lista de activos
      listaActivos.appendChild(divActivo);

      // Agregar el evento de click al botón "Eliminar"
      const btnEliminar = divActivo.querySelector(".btnEliminar");
      btnEliminar.addEventListener("click", eliminarActivo);
  });
}

// Función para calcular el total invertido
function calcularTotalInvertido() {
  const totalInvertido = arrayActivos.reduce((sum, activo) => sum + activo.capitalInvertido, 0);
  const totalInvertidoElement = document.getElementById("totalInvertido");
  totalInvertidoElement.innerText = "Total invertido: " + totalInvertido;
}

// Función para guardar los activos en el LocalStorage
function guardarActivos() {
  localStorage.setItem("portafolioGuardar", JSON.stringify(arrayActivos));
}

// Función para recuperar los activos del LocalStorage
function recuperarActivos() {
  const activosGuardados = localStorage.getItem("portafolioGuardar");
  if (activosGuardados) {
      arrayActivos = JSON.parse(activosGuardados);
      mostrarActivos();
  }
}

// Función para manejar el evento de click en el botón "Agregar"
function agregarActivo() {
  // Obtener los valores de los campos del formulario
  const ticker = document.getElementById("ticker").value;
  const nombre = document.getElementById("nombre").value;
  const cantidadPapeles = parseFloat(document.getElementById("cantidadPapeles").value);
  const capitalInvertido = parseFloat(document.getElementById("capitalInvertido").value);

  // Validar que los campos no estén vacíos y que los valores sean números válidos
  if (!ticker || !nombre || isNaN(cantidadPapeles) || isNaN(capitalInvertido) || cantidadPapeles <= 0 || capitalInvertido <= 0) {
      alert("Por favor, complete todos los campos con valores válidos.");
      return;
  }

  // Crear un objeto Activo con los valores obtenidos
  const activo = new Activo(ticker, nombre, cantidadPapeles, capitalInvertido);

  // Agregar el activo al array
  arrayActivos.push(activo);

  // Mostrar los activos en el HTML
  mostrarActivos();

  // Limpiar los campos del formulario
  document.getElementById("ticker").value = "";
  document.getElementById("nombre").value = "";
  document.getElementById("cantidadPapeles").value = "";
  document.getElementById("capitalInvertido").value = "";

  // Actualizar el total invertido
  calcularTotalInvertido();
}

// Asignar el evento de carga de la página para evitar la actualización
document.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault();

  // Asignar el evento de click al botón "Agregar"
  document.getElementById("btnAgregar").addEventListener("click", agregarActivo);

  // Asignar el evento de click al botón "Guardar cambios"
  document.getElementById("btnGuardar").addEventListener("click", guardarActivos);

  // Asignar el evento de click al botón "Recuperar"
  document.getElementById("btnRecuperar").addEventListener("click", recuperarActivos);
});

// --------------------------CODIO ANTERIO DE REFERENCIA--------


// console.log("Herramientas a elegir:");
// console.log("1. Calculadora de interés compuesto.");
// console.log("2. Calculadora para tamaño de posición.");
// console.log("3. Calculadora de precio para CEDEAR.");
// console.log("4. Registrar operaciones.");

// let activosArray = [];

// class Activo {
//   constructor(nombre, ticker, capitalInvertido, cantidadPapeles, tipoActivo) {
//     this.nombre = nombre;
//     this.ticker = ticker;
//     this.capitalInvertido = capitalInvertido;
//     this.cantidadPapeles = cantidadPapeles;
//     this.tipoActivo = tipoActivo;
//     this.precioPromedioCompra = capitalInvertido / cantidadPapeles;
//   }
// }

// function activoAgregar() {
//   let nombre = prompt("Ingrese el nombre del activo:");
//   let ticker = prompt("Ingrese el ticker del activo:");
//   let capitalInvertido = parseFloat(prompt("Ingrese el capital invertido en el activo:"));
//   let cantidadPapeles = parseFloat(prompt("Ingrese la cantidad de papeles del activo:"));
//   let tipoActivo = prompt("Ingrese el tipo de activo:");

//   let activo = new Activo(nombre, ticker, capitalInvertido, cantidadPapeles, tipoActivo);
//   activosArray.push(activo);
// }

// function activoEliminar() {
//   let ticker = prompt("Ingrese el ticker del activo a eliminar:");

//   for (let i = 0; i < activosArray.length; i++) {
//     if (activosArray[i].ticker === ticker) {
//       activosArray.splice(i, 1);
//       console.log("Activo eliminado.");
//       return;
//     }
//   }

//   console.log("No se encontró ningún activo con ese nombre.");
// }

// function activoBuscar() {
//   let nombre = prompt("Ingrese el nombre del activo a buscar:");

//   for (let i = 0; i < activosArray.length; i++) {
//     if (activosArray[i].nombre === nombre) {
//       console.log(activosArray[i]);
//       return;
//     }
//   }

//   console.log("No se encontró ningún activo con ese nombre.");
// }

// let opcion = "";
// while (opcion !== "salir") {
//   opcion = prompt("Seleccione una herramienta:\n1. Calculadora de interes compuesto.\n2. Calculadora para tamaño de posición.\n3. Calculadora para precios de CEDEARs.\n4. Registrar Operaciones.\n5. Salir");
//   switch (opcion) {
//     case "1":

//       ////////// Calculadora de interes compuesto INICIO

//       console.log("Seleccionaste la Calculadora de interés compuesto:")
//       var capital = parseFloat(prompt("Ingrese el capital a invertir:"));
//       var tasa = parseFloat(prompt("Ingrese la tasa de interés:"));
//       var reinversion = parseInt(prompt("Ingresar la cantidad de veces que se reinvierte el capital + interes"));
//       var rendimiento = capital;

//       for (var i = 0; i < reinversion; i++) {
//         var interes = rendimiento * (tasa / 100);
//         rendimiento += interes;
//       }

//       alert("Capital inicial: "+ capital.toString() + "\nTasa: "+ tasa.toString() + "\nPeriodos reinvertidos: "+ reinversion.toString() + "\nInterés generado: "+ (rendimiento - capital).toFixed(2).toString() + "\nTotal: " + rendimiento.toFixed(2) + "\nRendimiento %: " + ((rendimiento - capital)/capital * 100).toFixed(2))

//       //Calculadora de interes compuesto FIN

//       break;

//     case "2":

//       ////////// Calculadora para tamaño de posición INICIO

//       console.log("Seleccionaste la calculadora para tamaño de posición:")

//       let capitalInicial = parseFloat(prompt("Ingrese el monto del capital inicial:"));
//       let capitalPerder = parseFloat(prompt("Ingrese el monto a arriesgar por operación:"));
//       let stopLoss = parseFloat(prompt("Ingrese el valor del stop loss:"));
//       let perdidaPorcentaje = (capitalPerder / capitalInicial) * 100;
//       let capitalLimite = parseFloat(prompt("Ingresa porcentaje máximo de capital a comprometer:"))

//       let capitalColocar = (capitalPerder * 100) / stopLoss;
//       let capitalPorcentaje = (capitalColocar / capitalInicial) * 100;

//       alert("Capital inicial: "+ capitalInicial.toString() + "\nStop Loss: "+ stopLoss.toFixed(2).toString() + "%" + "\nPérdida por stop loss: "+ capitalPerder.toFixed(2).toString() + ", y representa el " + perdidaPorcentaje.toFixed(2).toString() + "% del capital inicial." + "\nInvertir: "+ capitalColocar.toString() + " representa el " + capitalPorcentaje.toFixed(2).toString() + "% del capital inicial.")

//       if (capitalPorcentaje > capitalLimite) {
//         console.log("La inversión es grande, representa mas del 20% del capital incial.");
//       } else {
//         console.log("La inversión es baja, representa menos del 20% del capital inicial.");
//       }

//       //Calculadora para tamaño de posición FIN

//       break;

//     case "3":

//       ////////// Calculadora para precios de CEDEARS INICIO

//       console.log("Seleccionaste la calculadora para CEDEARS:")

//       let precioSub = parseFloat(prompt("Ingrese el precio del subyacente:"));
//       let precioCcl = parseFloat(prompt("Ingrese el precio del CCL:"));
//       let ratio = parseFloat(prompt("Ingrese el ratio de conversión:"));

//       function cedear(precioSub, precioCcl, ratio) {
//         let precioCedear = (precioSub * precioCcl) / ratio;
//         return precioCedear;
//       }

//       let resultado = cedear(precioSub, precioCcl, ratio)

//       alert("El precio aproximado del CEDEAR consultado es de: " + resultado.toFixed(2))

//       //Calculadora para precios de CEDEARS FIN

//       break;

//     case "4":

//       ////////// Registrar operaciones

//       console.log("Agregar acción/CEDEAR.");


//       let opcionRegistro = "";

//       while (opcionRegistro !== "salir") {
//         opcionRegistro = prompt("Seleccione una opción:\n1. Activos registrados\n2. Agregar activo\n3. Eliminar activo\n4. Buscar activo\n5. Filtrar activos por tipo\n6. Salir");
//         switch (opcionRegistro) {

//           case "1":
//             var contenido = activosArray.join(' ');
//             alert('El contenido del array es:\n' + contenido)
//             // for (let i = 0; i < activosArray.length; i++) {
//             //   alert(activosArray[i])

//             // }
//             break;
//           case "2":

//             // AGREGAR ACTIVO
//             activoAgregar();
//             break;

//           case "3":

//             // ELIMINAR ACTIVO

//             activoEliminar();
//             break;

//           case "4":

//             // BUSCAR ACTIVO

//             activoBuscar();
//             break;

//           case "5":

//             // FILTRAR ACTIVO

//             let tipo = prompt("Ingrese el tipo de activo por el que desea filtrar:");

//             let activosFiltrados = activosArray.filter(activo => activo.tipoActivo === tipo);

//             if (activosFiltrados.length > 0) {
//               console.log("Activos encontrados del tipo", tipo + ":");
//               activosFiltrados.forEach(activo => console.log(activo));
//             } else {
//               console.log("No se encontraron activos del tipo", tipo + ".");
//             }
//             break;

//           case "6":

//             opcionRegistro = "salir";
//             break

//           default:
//             console.log("Opción inválida.");
//             break;
//         }
//       }
//       break;

//     case "5":
//       opcion = "salir";
//       console.log("Programa finalizado.")
//       break

//     default:
//       console.log("Opción inválida.")
//       break;
//   }
// }