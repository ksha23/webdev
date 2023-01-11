async function getRestaurants() {
  const response = await fetch('mock-data.json');
  const data = await response.json();
  return data;
}

async function displayResults(restaurants) {
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = '';
  for (const restaurant of restaurants) {
    const restaurantElement = document.createElement('div');
    restaurantElement.classList.add('restaurant');
    restaurantElement.innerHTML = `
      <h2>${restaurant.name}</h2>
      <p><b>Cuisine:</b> ${restaurant.cuisine}</p>
      <p><b>Price Range:</b> ${restaurant.price}</p>
      <p><b>Rating:</b> ${restaurant.rating}</p>
      <p><b>Location:</b> ${restaurant.location}</p>
    `;
    resultsContainer.appendChild(restaurantElement);
  }
}

async function init() {
  const restaurants = await getRestaurants();
  displayResults(restaurants);

  const form = document.getElementById('filter-form');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const cuisine = document.getElementById('cuisine-select').value;
    const price = document.getElementById('price-select').value;
    const rating = document.getElementById('rating-select').value;
    const location = document.getElementById('location-input').value.toLowerCase();

    let filteredRestaurants = restaurants;
    if (cuisine !== 'all') {
      filteredRestaurants = filteredRestaurants.filter((restaurant) => restaurant.cuisine === cuisine);
    }
    if (price !== 'all') {
      filteredRestaurants = filteredRestaurants.filter((restaurant) => restaurant.price <= price);
    }
    if (rating !== 'all') {
      filteredRestaurants = filteredRestaurants.filter((restaurant) => restaurant.rating >= rating);
    }
    if (location != 'all') {
      filteredRestaurants = filteredRestaurants.filter((restaurant) => restaurant.location.toLowerCase().includes(location));
    }

    displayResults(filteredRestaurants);
  });
}

init();
