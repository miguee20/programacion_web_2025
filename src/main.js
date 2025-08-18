const gallery = document.getElementById("gallery");
const searchInput = document.getElementById("search");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const modal = document.getElementById("modal");
const modalBody = document.getElementById("modalBody");
const closeModal = document.getElementById("closeModal");

let offset = 0;
const limit = 20;

//Fetch Pokémon list
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
    console.error("Error loading Pokémon:", error);
    gallery.innerHTML = "<p>Failed to load Pokémon 😢</p>";
  }
}

//Render cards
function renderPokemons(pokemons) {
  gallery.innerHTML = "";
  pokemons.forEach((p) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h2>${p.name.toUpperCase()}</h2>
      <img src="${p.sprites.other["official-artwork"].front_default}" alt="${p.name}">
      <p><strong>Type:</strong> ${p.types.map(t => t.type.name).join(", ")}</p>
    `;
    card.addEventListener("click", () => openModal(p));
    gallery.appendChild(card);
  });
}

//Modal logic
function openModal(pokemon) {
  modalBody.innerHTML = `
    <h2>${pokemon.name.toUpperCase()}</h2>
    <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name}">
    <p><strong>ID:</strong> #${pokemon.id}</p>
    <p><strong>Type:</strong> ${pokemon.types.map(t => t.type.name).join(", ")}</p>
    <p><strong>Height:</strong> ${pokemon.height / 10} m</p>
    <p><strong>Weight:</strong> ${pokemon.weight / 10} kg</p>
  `;
  modal.classList.remove("hidden");
}

closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
  }
});

//Search Pokémon
async function searchPokemon(name) {
  if (!name) {
    getPokemons(offset, limit);
    return;
  }

  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
    if (!res.ok) {
      gallery.innerHTML = `<p>Pokémon "${name}" not found 😢</p>`;
      return;
    }
    const pokemon = await res.json();
    renderPokemons([pokemon]);
  } catch (error) {
    console.error("Error searching Pokémon:", error);
  }
}

//Listeners
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

//Initial load
getPokemons(offset, limit);
