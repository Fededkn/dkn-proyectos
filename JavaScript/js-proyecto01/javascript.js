console.log("Herramientas a elegir:");
console.log("1. Calculadora de interés compuesto.");
console.log("2. Calculadora para tamaño de posición.");
console.log("3. Calculadora de precio para CEDEAR.");

      //Calculadora para precios de CEDEARS INICIO

let opcion = parseInt(prompt ("Elija la herramienta a utilizar o 'salir' para cerrar:")); 

while (opcion !== "salir") {
  switch (opcion) {
    case 1:
  
      //Calculadora de interes compuesto INICIO
  
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
      console.log("Interés generado:", + (rendimiento-capital).toFixed(2));
      console.log("Total:", + rendimiento.toFixed(2))
      console.log("Rendimiento %:", ((rendimiento - capital) / capital * 100).toFixed(2));

      //Calculadora de interes compuesto FIN

      break;
  
    case 2:

      //Calculadora para tamaño de posición INICIO

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

      //Calculadora para precios de CEDEARS INICIO

      console.log("Seleccionaste la calculadora para CEDEARS:")

      let precioSub = parseFloat(prompt("Ingrese el precio del subyacente:"));
      let precioCcl = parseFloat(prompt("Ingrese el precio del CCL:"));
      let ratio = parseFloat(prompt("Ingrese el ratio de conversión:"));

      function cedear (precioSub, precioCcl, ratio) {
        let precioCedear = (precioSub * precioCcl) / ratio;
        return precioCedear;
      }

      let resultado = cedear(precioSub, precioCcl, ratio)

      console.log("El precio aproximado del CEDEAR consultado es de: " + resultado)

      break;

    default:

      console.log("Por favor, elija un valor correcto: 1, 2 o 3.")

      //Calculadora para precios de CEDEARS FIN

      break;
  }
  opcion = prompt ("Escriba 'salir' para cerrar")
}

