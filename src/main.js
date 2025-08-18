const gallery = document.getElementById("gallery");
const searchInput = document.getElementById("search");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let offset = 0;   // desde qué Pokémon empezar
const limit = 20; // cuántos mostrar por página

// 🔹 Obtener lista de Pokémon
async function getPokemons(offset = 0, limit = 20) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
    const data = await res.json();

    const pokemons = await Promise.all(
      data.results.map(async (pokemon) => {
        const res = await fetch(pokemon.url);
        return res.json();
      })
    );

    renderPokemons(pokemons);
  } catch (error) {
    console.error("Error cargando Pokémon:", error);
    gallery.innerHTML = "<p>Ocurrió un error cargando los Pokémon 😢</p>";
  }
}

// 🔹 Renderizar tarjetas
function renderPokemons(pokemons) {
  gallery.innerHTML = "";
  pokemons.forEach((p) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h2>${p.name.toUpperCase()}</h2>
      <img src="${p.sprites.other["official-artwork"].front_default}" alt="${p.name}">
      <p><strong>Tipo:</strong> ${p.types.map(t => t.type.name).join(", ")}</p>
    `;
    gallery.appendChild(card);
  });
}

// 🔹 Buscar Pokémon por nombre
async function searchPokemon(name) {
  if (!name) {
    getPokemons(offset, limit);
    return;
  }

  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
    if (!res.ok) {
      gallery.innerHTML = `<p>No se encontró el Pokémon "${name}" 😢</p>`;
      return;
    }
    const pokemon = await res.json();
    renderPokemons([pokemon]);
  } catch (error) {
    console.error("Error buscando Pokémon:", error);
  }
}

// 🔹 Listeners
searchInput.addEventListener("input", (e) => {
  const query = e.target.value.trim();
  searchPokemon(query);
});

prevBtn.addEventListener("click", () => {
  if (offset >= limit) {
    offset -= limit;
    getPokemons(offset, limit);
  }
});

nextBtn.addEventListener("click", () => {
  offset += limit;
  getPokemons(offset, limit);
});

// 🔹 Cargar primeros Pokémon
getPokemons(offset, limit);
