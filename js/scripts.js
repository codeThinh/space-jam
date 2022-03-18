window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    const navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

bookBtn.addEventListener('click', modalCenter);

function modalCenter() {
    $('#bookModal').css({
        'display': 'flex',
        'justify-content': 'center',
        'align-items': 'center'
    })
}


// Location Input
const locationCardTemplate = document.querySelector("[data-location-template]")
const locationCardContainer = document.querySelector("[data-location-cards-container]")
const searchInput = document.querySelector("[data-search]")

let locations = []

searchInput.addEventListener("input", x => {
    const value = x.target.value.toLowerCase()
    locations.forEach(location => {
    const isVisible =
        location.company.toLowerCase().includes(value) ||
        location.add.toLowerCase().includes(value) ||
        location.city.toLowerCase().includes(value) ||
        location.zipcode.includes(value) 
    location.element.classList.toggle("hide", !isVisible)
    })
})

fetch("./js/locations.json")
    .then(res => res.json())
    .then(data => {
    locations = data.map(location => {
        const card = locationCardTemplate.content.cloneNode(true).children[0]
        const name = card.querySelector("[data-name]")
        const add = card.querySelector("[data-add]")
        const city = card.querySelector("[data-city]")
        name.textContent = location.company.name
        add.textContent = location.address.street + ", "
        city.textContent = location.address.city + ", " + location.address.state + ", " + location.address.zipcode
        locationCardContainer.append(card)
        return { company: location.company.name, add: location.address.street, city: location.address.city, zipcode: location.address.zipcode, element: card }
    })
})