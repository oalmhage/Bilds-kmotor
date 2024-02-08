let apiKey = '42149832-f9141c5344ccf49924bc7a124';
let searchInput = document.querySelector('#searchInput');
let colorSelect = document.querySelector('#colorSelect');
let form = document.querySelector("#searchForm");
let prevButton = document.querySelector('#prevButton');
let nextButton = document.querySelector('#nextButton');
let container = document.querySelector('#imageContainer')
let currentPage = 1;
let imagesPerPage = 12; //Godkänt av Jakob
let previousSearchTerm = "";
let previousColorFilter = "";

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    currentPage = 1;

    previousSearchTerm = searchInput.value;
    previousColorFilter = colorSelect.value;

    await fetchData();

});

prevButton.addEventListener('click', function () {
    if (currentPage > 1) {
        currentPage--;

        fetchData();

    }
});

nextButton.addEventListener('click', function () {
    currentPage++;

    fetchData();

});

async function fetchData() {

    let api = `https://pixabay.com/api/?key=${apiKey}&` +
        `q=${encodeURIComponent(previousSearchTerm)}&` +
        `per_page=${imagesPerPage}&` +
        `page=${currentPage}`;

    if (previousColorFilter) {
        api += `&colors=${previousColorFilter}`;
    }

    let response = await fetch(api);
    let data = await response.json();
    displayImages(data);
}

function displayImages(data) {

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