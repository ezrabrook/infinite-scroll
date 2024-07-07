const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let initialLoad = true;

//unsplash api 
const apiKey = '';
let count = 5;
let apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//check if all images were loaded
function imageLoaded() {
  imagedLoaded++; 
  console.log('imagesLoaded =', imagesLoaded);
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    initialLoad = false;
    count = 30;
  }
}

function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

//create elements for links and photos and add to dom
function displayPhotos() {
  total = photosArray.length;
  console.log('total images', total);

  photosArray.forEach((photo) => {
    // create <a> to link to unsplash
    const item = document.createElement('a');
    // create <img> for photo
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });
    const img = document.createElement('img');
    // put <img> inside <a>, then put both inside imageContainer
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // event listener, check when each is finished loading
    img.addEventListener('load', imageLoaded);

    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

//get photos from unsplash api
async function getPhotos() {
    try {
        const response = await fetch(apiURL);
        const photosArray = await response.json();
        console.log(photosArray);
        displayPhotos();
    } catch (error) {
        console.log(error);
    }
}

//check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        getPhotos();
        ready = false;
    }
});


//on load 
getPhotos();