const API_KEY = 'DYnrKjtMbrvbtb17Uqgx3rra066D25ghL0QcfW3M';

window.addEventListener('DOMContentLoaded', getCurrentImageOfTheDay);

function getCurrentImageOfTheDay() {
    const currentDate = new Date().toISOString().split("T")[0];
    const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${currentDate}`;
    
    // Fetching data from NASA API for the current date
    fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch the image of the day.');
        }
        return response.json();
    })
        .then(data => {
            // Displaying data in the current-image-container.
            const currentImageContainer = document.getElementById('current-image-container');
            currentImageContainer.innerHTML = `
                <h1>NASA Picture of the Day</h1>
                <img src="${data.url}" alt="${data.title}" width="800px"/>
                <h2 style="padding:20px 0;font-size:26px">${data.title}</h2>
                <p>${data.explanation}</p>
            `;
        })
        .catch(error => {
            // Handling Errors
            console.error('Error:', error);
            const currentImageContainer = document.getElementById('current-image-container');
            currentImageContainer.innerHTML = `<p>Error: Failed to fetch the image of the day ${date}.</p>`;
        });
}

function getImageOfTheDay(date) {
    const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`;
    
    // Fetching data from NASA API for the selected date
    fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch the image for the selected date.');
        }
        return response.json();
    })
        .then(data => {
            // Displaying data in the current-image-container
            const currentImageContainer = document.getElementById('current-image-container');
            currentImageContainer.innerHTML = `
            <h1>Picture ON ${date}</h1>
                <img src="${data.url}" alt="${data.title}" />
                <h2 style="padding:20px; font-size:26px">${data.title}</h2>
                <p style="padding:20px">${data.explanation}</p>
                
            `;
            
            // Save the date to local storage
            saveSearch(date);
            // Call addSearchToHistory function
            addSearchToHistory();
        })
        .catch(error => {
            // handling errors
            console.error('Error:', error);
            const currentImageContainer = document.getElementById('current-image-container');
            currentImageContainer.innerHTML = `<p>Error: Failed to fetch the image for the selected date ${date}.</p>`;
        });
}

function saveSearch(date) {
    let searches = JSON.parse(localStorage.getItem('searches')) || [];
    searches.push(date);
    localStorage.setItem('searches', JSON.stringify(searches)); // save search history to localstorage.
}

function addSearchToHistory() {
  const searchHistory = document.getElementById('search-history');
    searchHistory.innerHTML = `<h1>Previous Search</h1>`;

    const searches = JSON.parse(localStorage.getItem('searches')) || [];
    searches.forEach((search) => {
        // create li element and display search history
        let listItem = document.createElement('li');
        listItem.textContent = search;
        // retrive previous image on clicking li element.
        listItem.addEventListener('click', () => {
            getImageOfTheDay(search);
        });
        searchHistory.appendChild(listItem);
    });
}

window.addEventListener('DOMContentLoaded', () => {
    getCurrentImageOfTheDay();

    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const searchDate = searchInput.value;
        getImageOfTheDay(searchDate);
    });
});
