"Registro de Operaciones" 

Es una aplicación web diseñada para ayudarte a llevar un registro de tus activos financieros y operaciones de inversión. 

Al ingresar al sitio, se encuentra un encabezado con el título "Registro de operaciones" y se muestra una sección principal dividida en dos partes: la sección de la tabla de activos y la sección del gráfico.

En la sección de la tabla de activos, los usuarios pueden agregar activos financieros ingresando información como el ticker, el nombre, la cantidad de papeles y el capital invertido. Al hacer click en el botón "Agregar", la información se muestra en una tabla, lo que permite a los usuarios tener una visión general de sus activos.

La tabla incluye columnas para el ticker, el nombre, la cantidad de papeles, el PPC (precio promedio de compra) y el capital invertido. El precio promedio de compra se calcula automáticamente, y en su título está aplicada la librería Tippy.js para mostrar un toolkit que describa el PPC como "Precio promedio de compra". Cada fila también tiene un botón "Eliminar" que permite a los usuarios eliminar un activo de la tabla con una confirmación utilizando la librería SweetAlert2 para mejorar el aspecto de la alerta.

En la sección del gráfico, el sitio muestra un gráfico circular (aplicado con la librería Chart.js) que representa visualmente el capital invertido en cada activo. El gráfico es interactivo y se actualiza en tiempo real cuando se agregan o eliminan activos.

Para mejorar la experiencia del usuario, el sitio también muestra el total invertido en la parte superior de la tabla y la cotización del dólar CCL (contado con liquidación) obtenida a través de una API externa que proporciona tasas de cambio actualizadas (criptoya.com/api/dolar).


Otra característica relevante es el uso de LocalStorage para guardar los datos del formulario principal, lo que permite a los usuarios mantener sus activos almacenados incluso después de recargar la página o cerrar el navegador.
