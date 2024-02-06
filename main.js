let apiKey = '42149832-f9141c5344ccf49924bc7a124';
let currentPage = 1;
let imagesPerPage = 10;
let searchTerm = "";
let colorFilter = "";
let previousSearchTerm = "";
let previousColorFilter = "";
 
function searchImages() {
    let searchTerm = document.getElementById('searchInput').value;
    let colorFilter = document.getElementById('colorSelect').value;
 
    let api = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(searchTerm)}&per_page=${imagesPerPage}&page=${currentPage}`;
 
    // Lägger till färgfilter i API-länken om en färg är vald
    if (colorFilter) {
        api += `&colors=${colorFilter}`;
    }
 
    fetchData(api);
}

document.getElementById('searchButton').addEventListener('click', function() {
    latestSearch = searchTerm.value;
    latestColor = colorFilter.value;

    searchImages();
});

async function fetchData(api) {
    let response = await fetch(api);
    let data = await response.json();
    displayImages(data.hits);
}

document.getElementById('prevButton').addEventListener('click', function() {
    if (currentPage > 1) {
        currentPage--;
        searchImages();
    }
});
 
document.getElementById('nextButton').addEventListener('click', function() {
    currentPage++;
    fetchData (`https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(searchTerm)}&per_page=${imagesPerPage}&page=${currentPage}`)
});
 
function displayImages(images) {
    let container = document.getElementById('imageContainer');
 
    // Ta bort befintliga bilder om det finns några
    container.replaceChildren();
 
    images.forEach(image => {
        // Skapar bild-container
        let imageContainer = document.createElement('div');
        imageContainer.className = 'image-item';
   
        // Skapar bild-element
        let imgElement = document.createElement('img');
        imgElement.src = image.webformatURL;
   
        // Lägger till bild-texter direkt under bild-element
        let detailsContainer = document.createElement('div');
        detailsContainer.className = 'image-details';
   
        let tagsElement = document.createElement('p');
        tagsElement.textContent = image.tags;
   
        let photographerElement = document.createElement('p');
        photographerElement.textContent = 'Taken by: ' + image.user;
   
        //taggar och fotograf under bild-container
        detailsContainer.append(tagsElement);
        detailsContainer.append(photographerElement);
   
        //bild-element och texter i bild-container
        imageContainer.append(imgElement);
        imageContainer.append(detailsContainer);
   
        // Lägger till bild-container i imageContainer som finns i HTML
        container.append(imageContainer);
    });
 
    // Visa eller dölj knapparna beroende på antalet bilder och den aktuella sidan
    let prevButton = document.getElementById('prevButton');
    let nextButton = document.getElementById('nextButton');
 
    if (images.length > imagesPerPage || currentPage > 1) {
        prevButton.style.display = 'inline-block';
    } else {
        prevButton.style.display = 'none';
    }
 
    // Visa endast "next"
    if (images.length === imagesPerPage) {
        nextButton.style.display = 'inline-block';
    } else {
        nextButton.style.display = 'none';
    }
}