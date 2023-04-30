const global = {
	currentPage: window.location.pathname,
	search: {
		term: '',
		type: '',
		page: 1,
		totalPages: 1,
		totalResults: 0,
	},
	api: {
		// Register your key at https://www.themoviedb.org/settings/api and enter here
		// Only use this for development or very small projects. You should store your key and make requests from a server
		apiKey: '34327d14bdd899011fc01f09d8358e5f',
		apiUrl: 'https://api.themoviedb.org/3/',
	},
};
// Display 20 toys
async function displayAllToys() {
	const { results } = await fetchAPIData('movie/popular');

	results.forEach((movie) => {
		const div = document.createElement('div');
		div.classList.add('card');
		div.innerHTML = `
          <a href="movie-details.html?id=${movie.id}">
            ${
				movie.poster_path
					? `<img
              src="/src/imgs/no-toy.jpeg"
              class="card-img-top"
              alt="${movie.title}"
            />`
					: `<img
            src="../images/no-image.jpg"
            class="card-img-top"
            alt="${movie.title}"
          />`
			}
          </a>
          <div class="card-body">
            <h5 class="card-title">No toy shefilor</h5>
            <p class="card-text">
            </p>
          </div>
        `;

		document.querySelector('#all-toys').appendChild(div);
	});
}

async function search() {
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);

	global.search.type = urlParams.get('type');
	global.search.term = urlParams.get('search-term');

	if (global.search.term !== '' && global.search.term !== null) {
		const { results, total_pages, page, total_results } =
			await searchAPIData();

		global.search.page = page;
		global.search.totalPages = total_pages;
		global.search.totalResults = total_results;

		if (results.length === 0) {
			showAlert('No results found');
			return;
		}

		displaySearchResults(results);

		document.querySelector('#search-term').value = '';
	} else {
		showAlert('Please enter a search term');
	}
}

async function displaySlider() {
	const { results } = await fetchAPIData('movie/now_playing');

	results.forEach((movie) => {
		const div = document.createElement('div');
		div.classList.add('swiper-slide');

		div.innerHTML = `
      <a href="movie-details.html?id=${movie.id}">
        <img src="/src/imgs/no-toy.jpeg" alt="${movie.title}" />
      </a>
      <h4 class="swiper-rating">
        <i class="fas fa-star text-secondary"></i> ${movie.vote_average} / 10
      </h4>
    `;

		document.querySelector('.swiper-wrapper').appendChild(div);

		initSwiper();
	});
}

function initSwiper() {
	const swiper = new Swiper('.swiper', {
		slidesPerView: 1,
		spaceBetween: 30,
		freeMode: true,
		loop: true,
		autoplay: {
			delay: 4000,
			disableOnInteraction: false,
		},
		breakpoints: {
			500: {
				slidesPerView: 2,
			},
			700: {
				slidesPerView: 3,
			},
			1200: {
				slidesPerView: 4,
			},
		},
	});
}

// Fetch data from TMDB API
async function fetchAPIData(endpoint) {
	const API_KEY = global.api.apiKey;
	const API_URL = global.api.apiUrl;

	showSpinner();

	const response = await fetch(
		`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
	);

	const data = await response.json();

	hideSpinner();

	return data;
}

// Make Request To Search
async function searchAPIData() {
	const API_KEY = global.api.apiKey;
	const API_URL = global.api.apiUrl;

	showSpinner();

	const response = await fetch(
		`${API_URL}search/${global.search.type}?api_key=${API_KEY}&language=en-US&query=${global.search.term}&page=${global.search.page}`
	);

	const data = await response.json();

	hideSpinner();

	return data;
}

function showSpinner() {
	document.querySelector('.spinner').classList.add('show');
}

function hideSpinner() {
	document.querySelector('.spinner').classList.remove('show');
}

// Show Alert
function showAlert(message, className = 'error') {
	const alertEl = document.createElement('div');
	alertEl.classList.add('alert', className);
	alertEl.appendChild(document.createTextNode(message));
	document.querySelector('#alert').appendChild(alertEl);

	setTimeout(() => alertEl.remove(), 3000);
}

// Init App
function init() {
	switch (global.currentPage) {
		case '/':
		case '/dist/html/carouselpage.html':
			displaySlider();
			displayAllToys();
			break;
		case '/search.html':
			search();
			break;
	}
}

document.addEventListener('DOMContentLoaded', init);
