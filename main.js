let apiKey = '42149832-f9141c5344ccf49924bc7a124';
let currentPage = 1;
let imagesPerPage = 12; //Godkänt av Jakob
let previousSearchTerm = "";
let previousColorFilter = "";

document.getElementById('searchButton').addEventListener('click', (event) => {
    event.preventDefault();
    currentPage = 1;
    searchImages();
});

function searchImages() {
    let searchTerm = document.getElementById('searchInput').value;
    let colorFilter = document.getElementById('colorSelect').value;

    let api = `https://pixabay.com/api/?key=${apiKey}&` +
        `q=${encodeURIComponent(searchTerm)}&` +
        `per_page=${imagesPerPage}&` +
        `page=${currentPage}`;

    if (colorFilter) {
        api += `&colors=${colorFilter}`;
    }

    // Sparar föregående sökvärden
    if (searchTerm !== "") {
        previousSearchTerm = searchTerm;
    }
    if (colorFilter !== "") {
        previousColorFilter = colorFilter;
    }

    fetchData(api);

}

async function fetchData(api) {
    let response = await fetch(api);
    let data = await response.json();
    displayImages(data);
}

document.getElementById('prevButton').addEventListener('click', function () {
    if (currentPage > 1) {
        currentPage--;

        // Använd föregående sökterm och färg när du klickar på "prev" eller "next"
        let api = `https://pixabay.com/api/?key=${apiKey}&` +
            `q=${encodeURIComponent(previousSearchTerm)}&` +
            `per_page=${imagesPerPage}&` +
            `page=${currentPage}&` +
            `colors=${previousColorFilter}`;

        fetchData(api);

    }
});

document.getElementById('nextButton').addEventListener('click', function () {
    currentPage++;

    let api = `https://pixabay.com/api/?key=${apiKey}&` +
        `q=${encodeURIComponent(previousSearchTerm)}&` +
        `per_page=${imagesPerPage}&` +
        `page=${currentPage}&` +
        `colors=${previousColorFilter}`;

    fetchData(api);

});

function displayImages(data) {
    let container = document.getElementById('imageContainer');

    container.replaceChildren();

    data.hits.forEach(image => {

        let imageContainer = document.createElement('div');
        imageContainer.className = 'image-item';

        let imgElement = document.createElement('img');
        imgElement.src = image.webformatURL;

        let detailsContainer = document.createElement('div');
        detailsContainer.className = 'image-details';

        let tagsElement = document.createElement('p');
        tagsElement.textContent = image.tags;

        let photographerElement = document.createElement('p');
        photographerElement.textContent = 'Taken by: ' + image.user;

        detailsContainer.append(tagsElement);
        detailsContainer.append(photographerElement);
        imageContainer.append(imgElement);
        imageContainer.append(detailsContainer);
        container.append(imageContainer);

    });

    let prevButton = document.getElementById('prevButton');
    let nextButton = document.getElementById('nextButton');

    if (data.hits.length > imagesPerPage || currentPage > 1) {
        prevButton.style.display = 'inline-block';
    } else {
        prevButton.style.display = 'none';
    }

    let totalPages = Math.ceil(data.totalHits / imagesPerPage);

    if (totalPages > currentPage) {
        nextButton.style.display = 'inline-block';
    } else {
        nextButton.style.display = 'none';
    }
}