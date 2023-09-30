// Function to fetch cat images from the API using Promise
function fetchCatImages(limit = 10) {
  return new Promise((resolve, reject) => {
    fetch(`https://api.thecatapi.com/v1/images/search?limit=${limit}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => resolve(data))
      .catch(error => reject(error));
  });
}

// Function to display cat images on the webpage
function displayCatImages(images) {
  const catImagesContainer = document.getElementById('catImages');

  images.forEach(image => {
    const col = document.createElement('div');
    col.classList.add('col-md-4', 'mb-4');

    const img = document.createElement('img');
    img.src = image.url;
    img.alt = 'Cat Image';
    img.classList.add('img-fluid');

    col.appendChild(img);
    catImagesContainer.appendChild(col);
  });
}

// Function to load more cat images dynamically
function loadMoreImages() {
  const limit = 5; 
  fetchCatImages(limit)
    .then(images => displayCatImages(images))
    .catch(error => console.error('Error fetching cat images:', error));
}

// Function to initialize the page
function initializePage() {
  const loadMoreButton = document.getElementById('loadMoreButton');
  loadMoreButton.addEventListener('click', loadMoreImages);

  // Initial load of cat images
  fetchCatImages()
    .then(images => displayCatImages(images))
    .catch(error => console.error('Error fetching cat images:', error));
}

// Run the initialization function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializePage);
