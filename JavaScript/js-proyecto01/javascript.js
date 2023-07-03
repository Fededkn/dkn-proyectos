console.log("Herramientas a elegir:");
console.log("1. Calculadora de interés compuesto.");
console.log("2. Calculadora para tamaño de posición.");
console.log("3. Calculadora de precio para CEDEAR.");
console.log("4. Registrar operaciones.");

let opcion = parseInt(prompt("Elija la herramienta a utilizar o 'salir' para cerrar:"));

while (opcion !== "salir") {
  switch (opcion) {
    case 1:

      ////////// Calculadora de interes compuesto INICIO

      console.log("Seleccionaste la Calculadora de interés compuesto:")
      var capital = parseFloat(prompt("Ingrese el capital a invertir:"));
      var tasa = parseFloat(prompt("Ingrese la tasa de interés:"));
      var reinversion = parseInt(prompt("Ingresar la cantidad de veces que se reinvierte el capital + interes"));
      var rendimiento = capital;

      for (var i = 0; i < reinversion; i++) {
        var interes = rendimiento * (tasa / 100);
        rendimiento += interes;
      }

      console.log("Capital inicial:", capital);
      console.log("Tasa:", tasa);
      console.log("Periodos reinvertidos:", reinversion)
      console.log("Interés generado:", +(rendimiento - capital).toFixed(2));
      console.log("Total:", +rendimiento.toFixed(2))
      console.log("Rendimiento %:", ((rendimiento - capital) / capital * 100).toFixed(2));

      //Calculadora de interes compuesto FIN

      break;

    case 2:

      ////////// Calculadora para tamaño de posición INICIO

      console.log("Seleccionaste la calculadora para tamaño de posición:")

      let capitalInicial = parseFloat(prompt("Ingrese el monto del capital inicial:"));
      let capitalPerder = parseFloat(prompt("Ingrese el monto a arriesgar por operación:"));
      let stopLoss = parseFloat(prompt("Ingrese el valor del stop loss:"));
      let perdidaPorcentaje = (capitalPerder / capitalInicial) * 100;
      let capitalLimite = parseFloat(prompt("Ingresa porcentaje máximo de capital a comprometer:"))

      let capitalColocar = (capitalPerder * 100) / stopLoss;
      let capitalPorcentaje = (capitalColocar / capitalInicial) * 100;

      console.log("Capital inicial:", capitalInicial);
      console.log("Stop Loss:", stopLoss.toFixed(2), "%")
      console.log("Pérdida por stop loss:", capitalPerder.toFixed(2), " y representa el ", perdidaPorcentaje.toFixed(2), "% del capital inicial.");
      console.log("Invertir:", capitalColocar, " y representa el ", capitalPorcentaje.toFixed(2), "% del capital inicial.");

      if (capitalPorcentaje > capitalLimite) {
        console.log("La inversión es grande, representa mas del 20% del capital incial.");
      } else {
        console.log("La inversión es baja, representa menos del 20% del capital inicial.");
      }

      //Calculadora para tamaño de posición FIN

      break;

    case 3:

      ////////// Calculadora para precios de CEDEARS INICIO

      console.log("Seleccionaste la calculadora para CEDEARS:")

      let precioSub = parseFloat(prompt("Ingrese el precio del subyacente:"));
      let precioCcl = parseFloat(prompt("Ingrese el precio del CCL:"));
      let ratio = parseFloat(prompt("Ingrese el ratio de conversión:"));

      function cedear(precioSub, precioCcl, ratio) {
        let precioCedear = (precioSub * precioCcl) / ratio;
        return precioCedear;
      }

      let resultado = cedear(precioSub, precioCcl, ratio)

      console.log("El precio aproximado del CEDEAR consultado es de: " + resultado)

      //Calculadora para precios de CEDEARS FIN

      break;

    case 4:

      ////////// Registrar operaciones

      console.log("Agregar acción/CEDEAR.");

      let activosArray = [];

      class Activo {
        constructor(nombre, ticker, capitalInvertido, cantidadPapeles, tipoActivo) {
          this.nombre = nombre;
          this.ticker = ticker;
          this.capitalInvertido = capitalInvertido;
          this.cantidadPapeles = cantidadPapeles;
          this.tipoActivo = tipoActivo;
          this.precioPromedioCompra = capitalInvertido / cantidadPapeles;
        }
      }

      let opcion = parseInt(prompt("Seleccione una opción:\n1. Agregar activo\n2. Eliminar activo\n3. Buscar activo\n4. Filtrar activos por tipo"));

      // AGREGAR ACTIVO
      function activoAgregar() {
        let nombre = prompt("Ingrese el nombre del activo:");
        let ticker = prompt("Ingrese el ticker del activo:");
        let capitalInvertido = parseFloat(prompt("Ingrese el capital invertido en el activo:"));
        let cantidadPapeles = parseFloat(prompt("Ingrese la cantidad de papeles del activo:"));
        let tipoActivo = prompt("Ingrese el tipo de activo:");

        let activo = new Activo(nombre, ticker, capitalInvertido, cantidadPapeles, tipoActivo, precioPromedioCompra);
  
        activosArray.push(activo);
      }

      // ELIMINAR ACTIVO

      function activoEliminar() {
        let ticker = prompt("Ingrese el ticker del activo a eliminar:");

        for (let i = 0; i < activosArray.length; i++) {
          if (activosArray[i].ticker === ticker) {
            activosArray.splice(i, 1);
            console.log("Activo eliminado.");
            return;
          }
        }

        console.log("No se encontró ningún activo con ese nombre.");
      }

      // BUSCAR ACTIVO

      function activoBuscar() {
        let nombre = prompt("Ingrese el nombre del activo a buscar:");

        for (let i = 0; i < activosArray.length; i++) {
          if (activosArray[i].nombre === nombre) {
            console.log(activosArray[i]);
            return;
          }
        }

        console.log("No se encontró ningún activo con ese nombre.");
      }

      // FILTRAR ACTIVO

      // let tipo = prompt("Ingrese el tipo de activo por el que desea filtrar:");

      // let activosFiltrados = activosArray.filter(activo => activo.tipoActivo === tipo);

      // if (activosFiltrados.length > 0) {
      //   console.log("Activos encontrados del tipo", tipo + ":");
      //   activosFiltrados.forEach(activo => console.log(activo));
      // } else {
      //   console.log("No se encontraron activos del tipo", tipo + ".");
      // }

      opcion = prompt("Escriba 'salir' para cerrar")

      while (opcion !== "salir") {
        switch (opcion) {
          case 1:
            activoAgregar();
            break
          case 2:
            activoEliminar();
            break
          case 3:
            activoBuscar();
          break
        }
      };
      break;

      default:

        console.log("Por favor, elija un valor correcto: 1, 2 o 3.")

        break;
  }
}
opcion = prompt("Escriba 'salir' para cerrar")

// Mostrar el contenido del array
console.log(activosArray);