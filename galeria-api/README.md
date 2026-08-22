Galería de Fotos - JSONPlaceholder API

Aplicación web desarrollada en un único archivo HTML que consume la API pública de JSONPlaceholder para obtener información de fotografías y representarla dinámicamente mediante una galería responsive.

El proyecto está orientado a la práctica del consumo de APIs mediante JavaScript, utilizando `fetch`, funciones asíncronas con `async/await`, manipulación del DOM y generación dinámica de elementos HTML.

Descripción

La aplicación realiza una petición HTTP a la API de JSONPlaceholder para obtener información de fotografías. De los datos recibidos se seleccionan las primeras 12 fotografías y se genera automáticamente una tarjeta para cada registro.

Cada tarjeta presenta:

* Imagen asociada a la fotografía.
* Título de la fotografía.
* Identificador de la fotografía.
* Identificador del álbum al que pertenece.
* Carga diferida de imágenes mediante `loading="lazy"`.

El proyecto también incorpora mecanismos de control de errores y una imagen de respaldo generada localmente mediante SVG en caso de que la imagen principal no pueda cargarse.

 Funcionalidades

 Consumo de API

La aplicación utiliza `fetch()` para realizar una solicitud HTTP a:

`https://jsonplaceholder.typicode.com/photos`

La respuesta es validada antes de procesarse y posteriormente convertida a formato JSON mediante `response.json()`.

Programación asíncrona

El flujo de obtención de información utiliza `async/await`, permitiendo manejar las operaciones asíncronas de forma estructurada y legible.

Renderizado dinámico

Las tarjetas no están escritas directamente en el HTML. Se generan mediante JavaScript a partir de los objetos recibidos desde la API.

Galería responsive

La galería utiliza CSS Grid para distribuir automáticamente las tarjetas según el espacio disponible en pantalla.

Carga diferida de imágenes

Las imágenes utilizan el atributo `loading="lazy"` para evitar cargar todas las imágenes inmediatamente y mejorar el comportamiento de la página.

Sistema de respaldo de imágenes

Si la imagen proporcionada por el servicio externo no puede cargarse, la aplicación genera una miniatura SVG local utilizando el identificador de cada fotografía.

Esto permite mantener visible la tarjeta incluso cuando existe un problema con el servicio de imágenes externo.

Manejo de errores

La aplicación verifica el estado de la respuesta HTTP y controla los errores producidos durante la solicitud.

Cuando ocurre un error, se informa al usuario mediante el elemento de estado de la interfaz y se registra información adicional en la consola del navegador.

Tecnologías utilizadas

* HTML5
* CSS3
* JavaScript
* Fetch API
* Async/Await
* JSON
* DOM API
* CSS Grid
* SVG

APIs y servicios utilizados

JSONPlaceholder

Se utiliza JSONPlaceholder como fuente de datos para obtener la información de las fotografías.

Endpoint utilizado:

`https://jsonplaceholder.typicode.com/photos`

Picsum Photos

Las imágenes mostradas en las tarjetas se obtienen mediante Picsum Photos utilizando el identificador de cada fotografía como `seed`.

Formato utilizado:

`https://picsum.photos/seed/{id}/150/150`

Estructura del proyecto

El proyecto está desarrollado completamente en un único archivo:

```text
galeria-fotos/
└── index.html
```

El archivo contiene:

* Estructura HTML.
* Estilos CSS integrados mediante la etiqueta `<style>`.
* Lógica JavaScript integrada mediante la etiqueta `<script>`.

No se utilizan archivos externos de CSS o JavaScript.

Flujo de funcionamiento

1. La aplicación se inicia mediante la función `iniciar()`.
2. Se ejecuta `obtenerFotos()`.
3. Se realiza una petición mediante `fetch()` a JSONPlaceholder.
4. Se valida la respuesta HTTP.
5. Los datos se convierten desde JSON mediante `response.json()`.
6. Se seleccionan las primeras 12 fotografías.
7. La función `mostrarGaleria()` procesa los resultados.
8. `crearTarjeta()` genera dinámicamente cada tarjeta.
9. Las tarjetas se agregan al DOM.
10. Las imágenes se cargan desde Picsum Photos.
11. Si una imagen falla, se utiliza una miniatura SVG generada localmente.
12. La interfaz informa el resultado de la operación.

Ejecución

No requiere instalación de dependencias ni configuración de un servidor.

Para ejecutar el proyecto:

1. Clonar o descargar el repositorio.
2. Abrir el archivo `index.html`.
3. Ejecutarlo directamente en un navegador web.

También puede ejecutarse utilizando una extensión como Live Server dentro de Visual Studio Code.

Objetivo del proyecto

El objetivo principal es practicar el consumo de APIs externas desde JavaScript y comprender el flujo completo de una solicitud asíncrona:

```text
Solicitud HTTP
      ↓
Respuesta de la API
      ↓
Conversión a JSON
      ↓
Procesamiento de datos
      ↓
Generación dinámica del DOM
      ↓
Visualización en la interfaz
```

El proyecto permite aplicar conceptos fundamentales del desarrollo frontend, especialmente el trabajo con APIs, operaciones asíncronas y manipulación dinámica de la interfaz.

Conceptos de JavaScript aplicados

Durante el desarrollo se utilizan diferentes conceptos fundamentales:

* `fetch()`
* `async/await`
* `try/catch`
* Promesas
* Objetos y arrays
* Métodos de arrays
* Funciones
* Template literals
* Manipulación del DOM
* Creación dinámica de elementos
* Manejo de errores
* Codificación Base64 para generar imágenes SVG mediante `data URI`

Estado del proyecto

Proyecto funcional desarrollado como ejercicio práctico de JavaScript y consumo de APIs.

Autor

Bryan Rafael Mendoza Montes
