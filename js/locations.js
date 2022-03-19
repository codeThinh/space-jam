const locationCardTemplate = document.querySelector("[data-location-template]")
const locationCardContainer = document.querySelector("[data-location-cards-container]")
const searchInput = document.querySelector("[data-search]")

let locations = []

searchInput.addEventListener("input", x => {
  const value = x.target.value.toLowerCase();
  locations.forEach(location => {
    const isVisible =
      location.name.toLowerCase().includes(value) ||
      location.add.toLowerCase().includes(value) ||
      location.city.toLowerCase().includes(value)
    location.element.classList.toggle("hide", !isVisible);
  })
})

fetch("../js/locations.json")
  .then(res => res.json())
  .then(data => {
    locations = data.map(location => {
      const card = locationCardTemplate.content.cloneNode(true).children[0];
      const name = card.querySelector("[data-name]");
      const add = card.querySelector("[data-add]");
      const city = card.querySelector("[data-city]");
      name.textContent = location.company.name;
      add.textContent = location.address.street + ", ";
      city.textContent = location.address.city + ", " + location.address.state + ", " + location.address.zipcode;
      locationCardContainer.append(card);
      return { name: location.company.name, add: location.address.street + ", ", city: location.address.city + ", " + location.address.state + ", " + location.address.zipcode, element: card }
    })
})