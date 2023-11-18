// Function to fetch and display search results
function fetchSearchResults(apiUrl) {
    var request = new XMLHttpRequest();
    request.open('GET', apiUrl);

    request.onload = function () {
        if (request.status === 200) {
            var response = request.responseText;
            var parseData = JSON.parse(response);
            displaySearchResults(parseData.articles); // Displaying search results
        } else {
            console.error('Error loading search results data. Status:', request.status);
        }
    };
    request.send();
}

// Function to display search results
function displaySearchResults(searchResults) {
    var searchResultsContainer = document.getElementById('search-results-container');
    searchResultsContainer.innerHTML = '';

    for (var i = 0; i < searchResults.length; i++) {
        var searchResult = searchResults[i];
        var searchResultElement = createSearchResultElement(searchResult);
        searchResultsContainer.appendChild(searchResultElement);
    }
}

// Function to create a search result element
function createSearchResultElement(searchResult) {
    var searchResultElement = document.createElement('div');
    searchResultElement.className = 'search-result';

    if (searchResult.urlToImage) {
        var image = document.createElement('img');
        image.src = searchResult.urlToImage;
        image.alt = searchResult.title;

        // Set a fixed size for the image
        image.style.width = '300px';
        image.style.height = '300px';

        searchResultElement.appendChild(image);
    }

    var titleElement = document.createElement('h2');
    titleElement.textContent = searchResult.title;
    searchResultElement.appendChild(titleElement);

    if (searchResult.author) {
        var authorElement = document.createElement('p');
        authorElement.textContent = `Author: ${searchResult.author}`;
        searchResultElement.appendChild(authorElement);
    }

    var descriptionElement = document.createElement('p');
    descriptionElement.textContent = searchResult.description;
    searchResultElement.appendChild(descriptionElement);

    var sourceElement = document.createElement('p');
    sourceElement.textContent = `Source: ${searchResult.source.name}`;
    searchResultElement.appendChild(sourceElement);

    var publishedAtElement = document.createElement('p');
    publishedAtElement.textContent = `Published At: ${searchResult.publishedAt}`;
    searchResultElement.appendChild(publishedAtElement);

    if (searchResult.content) {
        var contentElement = document.createElement('p');
        contentElement.textContent = `Content: ${searchResult.content}`;
        searchResultElement.appendChild(contentElement);
    }

    var urlElement = document.createElement('a');
    urlElement.href = searchResult.url;
    urlElement.textContent = 'Read more';
    searchResultElement.appendChild(urlElement);

    return searchResultElement;
}

document.addEventListener('DOMContentLoaded', function () {
    // Retrieve the search query parameter from the URL
    var urlParams = new URLSearchParams(window.location.search);
    var searchTerm = urlParams.get('query');

    // Display the search query in the page title
    document.title = 'Search Results - ' + searchTerm;

    // Get the container where search results will be displayed
    var searchResultsContainer = document.getElementById('search-results-container');

    // Check if the search term is not empty
    if (searchTerm !== null && searchTerm !== '') {
        // API endpoint with the search query and your API key
        var apiEndpoint = 'https://newsapi.org/v2/everything?' +
            'q=' + encodeURIComponent(searchTerm) +
            '&pageSize=10' +
            '&language=en' +
            '&apiKey=3502511772554cedb015fb78f3d4867d';

        // Perform an asynchronous request to the News API
        fetchSearchResults(apiEndpoint);
    } else {
        // Inform the user about an empty search term
        console.log('Invalid or empty search term.');
    }
});

// JavaScript to handle the search functionality
function performSearch() {
    // Get the input value
    var searchTerm = document.getElementById('inputBox').value.trim();

    // Check if the search term is not empty
    if (searchTerm !== '') {
        // API endpoint with the search query and your API key
        var apiEndpoint = 'https://newsapi.org/v2/everything?' +
            'q=' + encodeURIComponent(searchTerm) +
            '&pageSize=10' +
            '&language=en' +
            '&apiKey=3502511772554cedb015fb78f3d4867d';

        // Redirect to the new HTML page with the search results
        window.location.href = 'searchresults.html?query=' + encodeURIComponent(searchTerm);
    } else {
        // Inform the user about an empty search term
        console.log('Please enter a search term.');
    }
}

// Alternatively, you can trigger the search on pressing Enter in the input field
document.getElementById('inputBox').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        performSearch();
    }
});
