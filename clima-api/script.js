const barraBusqueda = document.querySelector('.barra-busqueda');
const botonBuscar = document.querySelector('.boton-buscar');
const iconoClima = document.querySelector('.icono-clima');
const contenedorClima = document.querySelector('.clima');
const mensajeError = document.querySelector('.error');

const apiKey = 'a2d682b422944b460a7d46f23e01d30f'; // tu API key de OpenWeatherMap

// Función asíncrona que consulta el clima de una ciudad
async function consultarClima(ciudad) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`;

  try {
    const respuesta = await fetch(apiUrl);

    if (!respuesta.ok) {
      // Ciudad no encontrada, key inválida, etc.
      contenedorClima.style.display = 'none';
      mensajeError.style.display = 'block';
      return;
    }

    const datos = await respuesta.json();
    mensajeError.style.display = 'none';
    contenedorClima.style.display = 'block';
    actualizarInterfazClima(datos);

  } catch (error) {
    // Errores de red (sin internet, DNS bloqueado, etc.)
    contenedorClima.style.display = 'none';
    mensajeError.style.display = 'block';
    console.error('Error al consultar el clima:', error);
  }
}

// Actualiza la interfaz con los datos recibidos
function actualizarInterfazClima(datos) {
  document.querySelector('.ciudad').innerHTML = datos.name;
  document.querySelector('.temperatura').innerHTML = `${Math.round(datos.main.temp)}°C`;
  document.querySelector('.humedad').innerHTML = `${datos.main.humidity}%`;
  document.querySelector('.viento').innerHTML = `${Math.round(datos.wind.speed * 3.6)} km/h`; // m/s a km/h

  const icono = obtenerIconoConHoraCorrecta(datos);
  iconoClima.src = `https://openweathermap.org/img/wn/${icono}@2x.png`;

  cambiarFondoSegunClima(icono);
}

// Determina si es de día o de noche comparando la hora actual de los datos (datos.dt)
// contra el amanecer y atardecer reales de esa ciudad (datos.sys.sunrise / sunset).
// Esto es más preciso que depender solo de la letra "d"/"n" que manda la API.
function obtenerIconoConHoraCorrecta(datos) {
  const horaActual = datos.dt;          // timestamp UTC del momento de los datos
  const amanecer = datos.sys.sunrise;   // timestamp UTC del amanecer
  const atardecer = datos.sys.sunset;   // timestamp UTC del atardecer

  const esDeDia = horaActual >= amanecer && horaActual < atardecer;

  // El código de ícono siempre viene como "XXd" o "XXn"; le quitamos la letra y ponemos la correcta
  const codigoBase = datos.weather[0].icon.substring(0, 2);
  return codigoBase + (esDeDia ? 'd' : 'n');
}

// Cambia el fondo del body según el código de ícono de OpenWeatherMap
// Tabla de referencia: https://openweathermap.org/weather-conditions
function cambiarFondoSegunClima(codigoIcono) {
  // Los primeros 2 dígitos del código indican la condición (el resto, si es de día "d" o de noche "n")
  const condicion = codigoIcono.substring(0, 2);

  const fondosPorClima = {
    '01': 'linear-gradient(135deg, #38bdf8, #0284c7)',   // cielo despejado
    '02': 'linear-gradient(135deg, #60a5fa, #1e3a8a)',    // pocas nubes
    '03': 'linear-gradient(135deg, #94a3b8, #475569)',    // nubes dispersas
    '04': 'linear-gradient(135deg, #64748b, #334155)',    // nublado
    '09': 'linear-gradient(135deg, #475569, #1e293b)',    // llovizna
    '10': 'linear-gradient(135deg, #334155, #0f172a)',    // lluvia
    '11': 'linear-gradient(135deg, #1e1b4b, #000000)',    // tormenta
    '13': 'linear-gradient(135deg, #e0f2fe, #94a3b8)',    // nieve
    '50': 'linear-gradient(135deg, #cbd5e1, #64748b)'     // niebla/neblina
  };

  document.body.style.background = fondosPorClima[condicion] || 'linear-gradient(135deg, #1e3a8a, #0f172a)';
}

// Eventos: clic en el botón buscar, o presionar Enter
botonBuscar.addEventListener('click', () => {
  const ciudad = barraBusqueda.value.trim();
  if (ciudad !== '') {
    consultarClima(ciudad);
  }
});

barraBusqueda.addEventListener('keydown', (evento) => {
  if (evento.key === 'Enter') {
    const ciudad = barraBusqueda.value.trim();
    if (ciudad !== '') {
      consultarClima(ciudad);
    }
  }
});
