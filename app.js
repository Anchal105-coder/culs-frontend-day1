// The Little Herb Garden
// Loads the herbs from data/herbs.json, shows them as cards,
// and lets the visitor search, filter and choose favourites.

const list = document.querySelector("#herbs-list")
const count = document.querySelector(".count")
const form = document.querySelector(".filters")
const search = document.querySelector("#search")
const onlyFavourites = document.querySelector("#only-favourites")

const STORAGE_KEY = "herb-favourites"

// State: everything the page has to remember
const state = {
  herbs: [],
  query: "",
  life: "all",
  onlyFavourites: false,
  favourites: loadFavourites(),
}

function loadFavourites() {
  try {
    return new Set(JSON.parse(localStorage.getItem(STORAGE_KEY)) || [])
  } catch {
    return new Set()
  }
}

function saveFavourites() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...state.favourites]))
  } catch {
    // Storage can be blocked, e.g. in a private window. The page still works.
  }
}

async function loadHerbs() {
  const response = await fetch("data/herbs.json")
  if (!response.ok) {
    throw new Error(`Could not load ${response.url}: ${response.status} ${response.statusText}`)
  }
  return response.json()
}

function element(tag, className, text) {
  const node = document.createElement(tag)
  node.className = className
  node.textContent = text
  return node
}

function card(herb) {
  const isFavourite = state.favourites.has(herb.name)

  const button = element("button", "favourite", isFavourite ? "★" : "☆")
  button.type = "button"
  button.dataset.name = herb.name
  button.setAttribute("aria-pressed", String(isFavourite))
  button.setAttribute("aria-label", `Favourite ${herb.name}`)

  const item = element("li", "card", "")
  item.append(
    button,
    element("h3", "name", herb.name),
    element("p", "latin", herb.latin),
    element("p", "use", herb.use),
    element("p", "life", herb.life))
  return item
}

function matches(herb) {
  const text = `${herb.name} ${herb.latin} ${herb.use}`.toLowerCase()
  return text.includes(state.query)
    && (state.life === "all" || herb.life === state.life)
    && (!state.onlyFavourites || state.favourites.has(herb.name))
}

function render() {
  const visible = state.herbs.filter(matches)
  list.replaceChildren(...visible.map(card))

  if (visible.length === 0) {
    count.textContent = "No herbs match your search."
  } else if (visible.length === state.herbs.length) {
    count.textContent = `${state.herbs.length} herbs grow here.`
  } else {
    count.textContent = `Showing ${visible.length} of ${state.herbs.length} herbs.`
  }
}

// Events: typing, choosing a filter, ticking the checkbox
form.addEventListener("input", () => {
  state.query = search.value.trim().toLowerCase()
  state.life = form.elements.life.value
  state.onlyFavourites = onlyFavourites.checked
  render()
})

// Pressing Enter in the search box should not reload the page
form.addEventListener("submit", (event) => event.preventDefault())

// One listener for all the star buttons
list.addEventListener("click", (event) => {
  const button = event.target.closest(".favourite")
  if (!button) return

  const name = button.dataset.name
  if (state.favourites.has(name)) {
    state.favourites.delete(name)
  } else {
    state.favourites.add(name)
  }
  saveFavourites()
  render()
  list.querySelector(`.favourite[data-name="${name}"]`)?.focus()
})

async function start() {
  try {
    state.herbs = await loadHerbs()
    render()
  } catch (error) {
    count.textContent = "Sorry, the herbs could not be loaded."
    console.error(error)
  }
}

start()