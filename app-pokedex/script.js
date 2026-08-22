const contenedorFiltros = document.getElementById("contenedorFiltros");
const cuadriculaPokemon = document.getElementById("cuadriculaPokemon");
const mensajeCarga = document.getElementById("mensajeCarga");
const barraBusqueda = document.querySelector(".barra-busqueda");
const botonBuscar = document.querySelector(".boton-buscar");

const CANTIDAD_POKEMON = 151; // Los 151 originales (puedes subir este número, ej: 251, 386...)

// Traduce los tipos de la PokeAPI (en inglés) a español, y sirve como clase CSS
const tiposEnEspanol = {
  normal: "normal",
  fire: "fuego",
  water: "agua",
  grass: "planta",
  electric: "electrico",
  ice: "hielo",
  fighting: "lucha",
  poison: "veneno",
  ground: "tierra",
  flying: "volador",
  psychic: "psiquico",
  bug: "bicho",
  rock: "roca",
  ghost: "fantasma",
  dragon: "dragon",
  dark: "siniestro",
  steel: "acero",
  fairy: "hada",
};

// Traduce los nombres de las estadísticas (poderes) de la PokeAPI al español
const estadisticasEnEspanol = {
  hp: "PS",
  attack: "Ataque",
  defense: "Defensa",
  "special-attack": "At. Esp.",
  "special-defense": "Def. Esp.",
  speed: "Velocidad",
};

let todosLosPokemon = []; // Aquí guardamos todos los pokémon ya cargados, para filtrar sin volver a pedirlos

// Busca un pokémon por nombre (coincidencia parcial) o número exacto
function buscarPokemon() {
  const termino = barraBusqueda.value.trim().toLowerCase();

  if (termino === "") {
    mostrarPokemon(todosLosPokemon);
    return;
  }

  const resultado = todosLosPokemon.filter(
    (pokemon) =>
      pokemon.name.includes(termino) || String(pokemon.id) === termino,
  );

  if (resultado.length === 0) {
    cuadriculaPokemon.innerHTML =
      '<p class="cargando">No se encontró ningún Pokémon con ese nombre o número.</p>';
  } else {
    mostrarPokemon(resultado);
  }
}

botonBuscar.addEventListener("click", buscarPokemon);

barraBusqueda.addEventListener("keydown", (evento) => {
  if (evento.key === "Enter") {
    buscarPokemon();
  }
});

// Función asíncrona principal: trae todos los pokémon y arma la pantalla
async function iniciarPokedex() {
  try {
    // 1. Traemos la lista básica (nombre + url) de los primeros N pokémon
    const respuestaLista = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${CANTIDAD_POKEMON}`,
    );
    const listaBasica = await respuestaLista.json();

    // 2. Por cada uno, pedimos sus datos completos (imagen, tipos, altura, peso)
    //    Promise.all lanza todas las peticiones en paralelo, en vez de una por una (mucho más rápido)
    const peticiones = listaBasica.results.map((pokemon) =>
      fetch(pokemon.url).then((res) => res.json()),
    );
    todosLosPokemon = await Promise.all(peticiones);

    mensajeCarga.style.display = "none";
    crearBotonesDeFiltro();
    mostrarPokemon(todosLosPokemon);
  } catch (error) {
    mensajeCarga.textContent =
      "❌ Error al cargar la Pokédex. Revisa tu conexión.";
    console.error("Error al cargar pokémon:", error);
  }
}

// Crea los botones de filtro: "Ver todos" + uno por cada tipo
function crearBotonesDeFiltro() {
  const botonTodos = document.createElement("button");
  botonTodos.className = "boton-filtro filtro-todos activo";
  botonTodos.textContent = "Ver todos";
  botonTodos.addEventListener("click", () => {
    marcarBotonActivo(botonTodos);
    mostrarPokemon(todosLosPokemon);
  });
  contenedorFiltros.appendChild(botonTodos);

  Object.entries(tiposEnEspanol).forEach(([tipoIngles, tipoEspanol]) => {
    const boton = document.createElement("button");
    boton.className = `boton-filtro filtro-${tipoEspanol}`;
    boton.textContent = tipoEspanol;

    boton.addEventListener("click", () => {
      marcarBotonActivo(boton);
      const filtrados = todosLosPokemon.filter((pokemon) =>
        pokemon.types.some((t) => t.type.name === tipoIngles),
      );
      mostrarPokemon(filtrados);
    });

    contenedorFiltros.appendChild(boton);
  });
}

// Quita la clase "activo" de todos los botones y se la pone solo al que se hizo clic
function marcarBotonActivo(botonSeleccionado) {
  document
    .querySelectorAll(".boton-filtro")
    .forEach((b) => b.classList.remove("activo"));
  botonSeleccionado.classList.add("activo");
}

// Pinta las tarjetas de una lista de pokémon en la cuadrícula
function mostrarPokemon(listaPokemon) {
  cuadriculaPokemon.innerHTML = "";

  listaPokemon.forEach((pokemon) => {
    const numero = String(pokemon.id).padStart(3, "0");
    const imagen =
      pokemon.sprites.other["official-artwork"].front_default ||
      pokemon.sprites.front_default;

    const tiposHTML = pokemon.types
      .map((t) => {
        const tipoEs = tiposEnEspanol[t.type.name] || t.type.name;
        return `<span class="tipo tipo-${tipoEs}">${tipoEs}</span>`;
      })
      .join("");

    // Habilidades del pokémon (ability viene con guiones, ej: "solar-power" -> "solar power")
    const habilidadesHTML = pokemon.abilities
      .map(
        (a) =>
          `<span class="habilidad">${a.ability.name.replace("-", " ")}</span>`,
      )
      .join("");

    // Estadísticas (poderes): PS, Ataque, Defensa, etc. Cada barra se llena según el valor (máximo visual: 150)
    const estadisticasHTML = pokemon.stats
      .map((s) => {
        const nombreStat = estadisticasEnEspanol[s.stat.name] || s.stat.name;
        const porcentaje = Math.min((s.base_stat / 150) * 100, 100);
        return `
        <div class="fila-estadistica">
          <span class="etiqueta-stat">${nombreStat}</span>
          <div class="barra-fondo"><div class="barra-relleno" style="width: ${porcentaje}%"></div></div>
          <span class="valor-stat">${s.base_stat}</span>
        </div>
      `;
      })
      .join("");

    const tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta-pokemon";
    tarjeta.innerHTML = `
      <span class="numero-fondo">#${numero}</span>
      <img class="imagen-pokemon" src="${imagen}" alt="${pokemon.name}">
      <div class="info-pokemon">
        <p class="numero-pokemon">#${numero}</p>
        <h2 class="nombre-pokemon">${pokemon.name}</h2>
        <div class="tipos-pokemon">${tiposHTML}</div>
        <div class="medidas-pokemon">
          <span>${(pokemon.height / 10).toFixed(1)} m</span>
          <span>${(pokemon.weight / 10).toFixed(1)} kg</span>
        </div>
        <p class="subtitulo-tarjeta">Habilidades</p>
        <div class="habilidades-pokemon">${habilidadesHTML}</div>
        <p class="subtitulo-tarjeta">Estadísticas (poderes)</p>
        <div class="estadisticas-pokemon">${estadisticasHTML}</div>
      </div>
    `;

    cuadriculaPokemon.appendChild(tarjeta);
  });
}

// Punto de entrada
iniciarPokedex();
