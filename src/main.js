const gallery = document.getElementById("gallery");

async function getPokemons() {
  try {
    // Pedimos 20 Pokémon iniciales
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
    const data = await res.json();

    // Para cada Pokémon, traemos más info (tipo, imagen, etc.)
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

function renderPokemons(pokemons) {
  gallery.innerHTML = ""; // limpiar
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

getPokemons();
