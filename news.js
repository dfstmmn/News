// Function to fetch and display news articles
function fetchNews(apiUrl) {
    var request = new XMLHttpRequest();
    request.open('GET', apiUrl);

    request.onload = function () {
        if (request.status === 200) {
            var response = request.responseText;
            var parseData = JSON.parse(response);
            displayNews(parseData.articles); // Displaying news articles
        } else {
            console.error('Error loading news data. Status:', request.status);
        }
    };
    request.send();
}

function fetchTrends(apiUrl) {
    var request = new XMLHttpRequest();
    request.open('GET', apiUrl);

    request.onload = function () {
        if (request.status === 200) {
            var response = request.responseText;
            var parseData = JSON.parse(response);
            displayNews1(parseData.articles); // Displaying trend articles
        } else {
            console.error('Error loading trend data. Status:', request.status);
        }
    };
    request.send();
}

// Function to fetch and display headlines
function fetchHeadlines(apiUrl) {
    var request = new XMLHttpRequest();
    request.open('GET', apiUrl);

    request.onload = function () {
        if (request.status === 200) {
            var response = request.responseText;
            var parseData = JSON.parse(response);
            displayHeadlines(parseData.articles); // Displaying headlines
        } else {
            console.error('Error loading headline data. Status:', request.status);
        }
    };
    request.send();
}

// Function to display news articles
function displayNews(articles) {
    var newsListElement = document.getElementById('newsList');
    newsListElement.innerHTML = '';

    for (var i = 0; i < articles.length; i++) {
        var article = articles[i];
        var articleElement = createArticleElement(article);
        newsListElement.appendChild(articleElement);
    }
}

// Function to display trend articles
function displayNews1(articles1) {
    var trendListElement = document.getElementById('trendList'); // Corrected from getElementById1
    trendListElement.innerHTML = '';

    for (var i = 0; i < articles1.length; i++) {
        var article1 = articles1[i];
        var article1Element = createarticle1Element(article1);
        trendListElement.appendChild(article1Element);
    }
}

// Function to display headlines
function displayHeadlines(headline) {
    var headlinesListElement = document.getElementById('headlinesList');
    headlinesListElement.innerHTML = '';

    for (var i = 0; i < headline.length; i++) {
        var article = headline[i];
        var articleElement = createHeadlineElement(article);
        headlinesListElement.appendChild(articleElement);
    }
}

function createArticleElement(article) {
    var articleElement = document.createElement('div');
    articleElement.className = 'article';

    if (article.urlToImage) {
        var image = document.createElement('img');
        image.src = article.urlToImage;
        image.alt = article.title;

        // Set a fixed size for the image
        image.style.width = '200px';
        image.style.height = '200px';

        articleElement.appendChild(image);
    }

    var titleElement = document.createElement('h2');
    titleElement.textContent = article.title;
    articleElement.appendChild(titleElement);

    var sourceElement = document.createElement('p');
    sourceElement.textContent = `Source: ${article.source.name}`;
    articleElement.appendChild(sourceElement);

    var publishedAtElement = document.createElement('p');
    publishedAtElement.textContent = `Published At: ${article.publishedAt}`;
    articleElement.appendChild(publishedAtElement);


    if (article.author) {
        var authorElement = document.createElement('p');
        authorElement.textContent = `Author: ${article.author}`;
        articleElement.appendChild(authorElement);
    }

    var descriptionElement = document.createElement('p');
    descriptionElement.textContent = article.description;
    articleElement.appendChild(descriptionElement);



    var urlElement = document.createElement('a');
    urlElement.href = article.url;
    urlElement.textContent = 'Read more';
    articleElement.appendChild(urlElement);

    return articleElement;
}



function createarticle1Element(article1) {
    var article1Element = document.createElement('div');
    article1Element.className = 'article';

    // Create title link
    var titleLinkElement1 = document.createElement('a');
    titleLinkElement1.href = article1.url;
    titleLinkElement1.textContent = article1.title;
    article1Element.appendChild(titleLinkElement1);

    // Create and append the published date
    var publishedAtElement1 = document.createElement('p');
    publishedAtElement1.textContent = `Published At: ${article1.publishedAt}`;
    article1Element.appendChild(publishedAtElement1);

    return article1Element;
}


function createHeadlineElement(headline) {
    var headlineElement = document.createElement('div');
    headlineElement.className = 'headline';

    if (headline.urlToImage) {
        var image = document.createElement('img');
        image.src = headline.urlToImage;
        image.alt = headline.title;
        image.style.width = '300px';
        image.style.height = '300px';
        headlineElement.appendChild(image);
    }

    var titleLinkElement = document.createElement('a');
    titleLinkElement.href = headline.url;
    titleLinkElement.textContent = headline.title;
    headlineElement.appendChild(titleLinkElement);

    // Append additional elements like author, description, etc., as needed

    return headlineElement;
}


function changeCategory() {
    var selectedCategory = document.getElementById('category').value;

    // Determine the API URLs for news and trends based on the selected category
    var newsApiUrl = 'https://newsapi.org/v2/everything?sortBy=popularity&from=2023-11-15&' + 
    'q=' + selectedCategory
    + '&apiKey=e908d50bdad4444f90bc85f6c3dde7cf';

    var trendsApiUrl = 'https://newsapi.org/v2/everything?pageSize=5&' +
    'q=trending news ' + selectedCategory
    + '&apiKey=e908d50bdad4444f90bc85f6c3dde7cf';

    var headlinesApiUrl = 'https://newsapi.org/v2/everything?sortBy=relevancy&pageSize=2&' +
    'q=headlines ' + selectedCategory
    + '&apiKey=e908d50bdad4444f90bc85f6c3dde7cf';

    fetchNews(newsApiUrl);
    fetchTrends(trendsApiUrl);
    fetchHeadlines(headlinesApiUrl); // Fetching headlines

}

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

changeCategory();
