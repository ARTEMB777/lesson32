const searchInput = document.getElementById('search-input');
const moviesContainer = document.getElementById('movie-container');

const API_KEY = 'fefd742d';
const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}&s=`;

let timeout;

// Обробка пошуку в реальному часі
searchInput.addEventListener('input', () => {
  clearTimeout(timeout);

  const query = searchInput.value.trim();
  if (!query) {
    moviesContainer.innerHTML = '<p>Start typing to search for movies...</p>';
    return;
  }

  timeout = setTimeout(() => {
    fetchMovies(query);
  }, 500);
});

// Функція для отримання даних з API
async function fetchMovies(query) {
  try {
    const response = await fetch(`${API_URL}${query}`);
    const data = await response.json();

    if (data.Response === 'True' && data.Search) {
      displaymovies(data.Search);
    } else {
      moviesContainer.innerHTML = `<p>No movies found for "${query}".</p>`;
    }
  } catch (error) {
    moviesContainer.innerHTML = `<p>An error occurred. Please try again later.</p>`;
    console.error('Error fetching data:', error);
  }
}

// Відображення результатів пошуку
function displaymovies(movies) {
  moviesContainer.innerHTML = '';

  movies.forEach((movie) => {
    const card = document.createElement('div');
    card.classList.add('result-card');

    card.innerHTML = `
      <img src="${movie.Poster !== "N/A" ? movie.Poster : "placeholder.jpg"}" alt="${movie.Title}">
      <h3>${movie.Title}</h3>
      <p>${movie.Year}</p>
      <p>Type: ${movie.Type}</p>
    `;

    moviesContainer.appendChild(card);
  });
}

