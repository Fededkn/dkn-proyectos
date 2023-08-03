//Array para almacenar los activos
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

// Función para construir la fila de activo en la tabla
const construirFilaActivo = (activo, index) => {
  const { ticker, nombre, cantidadPapeles, precioPromedioCompra, capitalInvertido } = activo;
  const filaActivo = document.createElement("tr");

  // Construir el contenido de la fila con los datos del activo.
  filaActivo.innerHTML = `
    <td>${ticker}</td>
    <td>${nombre}</td>
    <td>${cantidadPapeles}</td>
    <td>${precioPromedioCompra.toFixed(2)}</td>
    <td>${capitalInvertido}</td>
    <td>
        <button class="btnEliminar" indiceActivo="${index}">Eliminar</button>
    </td>
  `;

  // Agregar la fila al cuerpo de la tabla
  const listaActivos = document.getElementById("listaActivos");
  listaActivos.appendChild(filaActivo);

  // Agregar el evento de click al botón "Eliminar"
  const btnEliminar = filaActivo.querySelector(".btnEliminar");
  btnEliminar.addEventListener("click", eliminarActivo);
};


  function eliminarActivo() {
    const indiceActivo = parseInt(this.getAttribute("indiceActivo"));
    const activoAEliminar = arrayActivos[indiceActivo];

    // Confirmar eliminación
    Swal.fire({
      title: "¿Estás seguro?",
      text: `Esta a punto de eliminar el activo: ${activoAEliminar.nombre}`,
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Eliminar",

    }).then((result) => {
      if (result.isConfirmed) {
        arrayActivos.splice(indiceActivo, 1);
        mostrarActivos();
        calcularTotalInvertido();

        Swal.fire({
          title: "Eliminado",
          text: `El activo ${activoAEliminar.nombre} ha sido eliminado.`,
        });
        mostrarGraficoPie()
      }
    });

  }

  // Función para mostrar la lista de activos en la tabla
  function mostrarActivos() {
    const listaActivos = document.getElementById("listaActivos");
    listaActivos.innerHTML = "";

    arrayActivos.forEach((activo, index) => {
      construirFilaActivo(activo, index);
    });
    calcularTotalInvertido();
  }

  // Función para calcular el total invertido
  function calcularTotalInvertido() {
    const totalInvertido = arrayActivos.reduce((sum, activo) => sum + activo.capitalInvertido, 0);
    const totalInvertidoElement = document.getElementById("totalInvertido");
    totalInvertidoElement.innerText = "Total invertido: " + totalInvertido.toFixed(2);
  }

  // Función para guardar los activos en el almacenamiento local
  function guardarActivos() {
        // Confirmación para guardar activos en local storgate
        Swal.fire({
          text: `¿Desea guardar los cambios realizados?`,
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          confirmButtonText: "Guardar",
    
        }).then((result) => {
          if (result.isConfirmed) {
            localStorage.setItem("portafolioGuardar", JSON.stringify(arrayActivos));
            Swal.fire({
              title: "Guardado",
              text: `El portafolio ha sido guardado con éxito.`,
            });
          }
        });
      }
    

  // Función para recuperar los activos desde el local storgate
  function recuperarActivos() {
    const activosGuardados = localStorage.getItem("portafolioGuardar");
    if (activosGuardados) {
      arrayActivos = JSON.parse(activosGuardados);
      mostrarActivos();
      calcularTotalInvertido();
      mostrarGraficoPie()
    }
  }

  // Función para agregar un nuevo activo
  function agregarActivo() {
    const ticker = document.getElementById("ticker").value;
    const nombre = document.getElementById("nombre").value;
    const cantidadPapeles = parseFloat(document.getElementById("cantidadPapeles").value);
    const capitalInvertido = parseFloat(document.getElementById("capitalInvertido").value);

    if (!ticker || !nombre || isNaN(cantidadPapeles) || isNaN(capitalInvertido) || cantidadPapeles <= 0 || capitalInvertido <= 0) {
      Swal.fire({
        title: "Error",
        text: "Por favor, complete todos los campos con valores válidos.",
      });
      return;
    }

    const activo = new Activo(ticker, nombre, cantidadPapeles, capitalInvertido);
    arrayActivos.push(activo);
    mostrarActivos();

    document.getElementById("ticker").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("cantidadPapeles").value = "";
    document.getElementById("capitalInvertido").value = "";

    calcularTotalInvertido();
    mostrarGraficoPie()
  }

// Variable para guardar la referencia al gráfico actual
let graficoPie;

// Función para mostrar el gráfico
const mostrarGraficoPie = () => {
  if (graficoPie) {
    // Si hay un gráfico existente, se elimina para colocar el nuevo
    graficoPie.destroy();
  }

  const datos = arrayActivos.map(activo => activo.capitalInvertido);
  const nombres = arrayActivos.map(activo => activo.nombre);

  // Crear el gráfico utilizando la librería Chart.js
  const ctx = document.getElementById("graficoPie").getContext("2d");
  graficoPie = new Chart(ctx, {
    type: "pie",
    data: {
      labels: nombres,
      datasets: [{
        data: datos,
        backgroundColor: [
          "rgb(255, 179, 186)", // Rosa
          "rgb(189, 204, 255)", // Azul
          "rgb(255, 236, 179)", // Amarillo
          "rgb(178, 223, 138)", // Verde
          "rgb(222, 184, 135)", // Marrón
          "rgb(255, 204, 153)", // Naranja
          "rgb(255, 204, 255)", // Lila
        ],
      }],
    },
    options: {
      responsive: true,
      legend: {
        display: true,
        position: "top",
        fontSize: 30,
      },
    },
  });
};

// Obtener la cotización del dólar CCL desde la API externa
fetch("https://criptoya.com/api/dolar")
  .then((resp) => resp.json())
  .then((data) => {
    const cclValue = data.ccl;
    // Mostrar el valor en el DOM
    const cclElement = document.getElementById("cotizacion-ccl");
    cclElement.innerText = "Cotización del dólar CCL: " + cclValue.toFixed(2);
  })
  .catch((error) => {
    console.error("Error al obtener los datos:", error);
  });

// Inicializar Tippy.js en la celda del "Precio promedio de compra"
tippy('#precioPromedioCompra', {
  placement: 'top',
  animation: 'scale',
  content: 'Precio promedio de compra',
});

// Cuando el contenido del DOM ha sido cargado completamente, ejecutar las siguientes funciones:
document.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault();

  document.getElementById("btnAgregar").addEventListener("click", agregarActivo);
  document.getElementById("btnGuardar").addEventListener("click", guardarActivos);
  document.getElementById("btnRecuperar").addEventListener("click", recuperarActivos);

  recuperarActivos();
  mostrarGraficoPie();
  obtenerCotizacionCCL();
  calcularTotalInvertido();
});