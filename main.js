function searchImages() {
    const apiKey = 'DIN_PIXABAY_API_NYCKEL';
    const searchTerm = document.getElementById('searchInput').value;
    const colorFilter = document.getElementById('colorSelect').value;

    let apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(searchTerm)}`;

    // Lägg till färgfilter om det är valt
    if (colorFilter) {
        apiUrl += `&colors=${colorFilter}`;
    }

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayImages(data.hits);
        })
        .catch(error => console.error('Error fetching images:', error));
}

function displayImages(images) {
    const container = document.getElementById('imageContainer');
    container.innerHTML = '';

    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.webformatURL;
        container.appendChild(imgElement);
    });
}

