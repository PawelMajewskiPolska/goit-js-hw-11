import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const qs = s => document.querySelector(s);

const displayGallery = qs('.gallery');

const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captiondelay: 250,
});

const renderPictures = allPhotos => {
  const markup = allPhotos
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        views,
        likes,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
        <a href="${largeImageURL}">
        <img class="photo" src="${webformatURL}" alt="${tags}" loading="lazy" />
        </a>
        <div class="info">
        <div class="info-item">
          <p class="info-item__text">${likes}</p>
            <p class="info-item__text" >Likes</p>
            </div>
            <div class="info-item__margin-left">
          <p class="info-item__text">${views}</p>
            <p class="info-item__text">Views</p>
            </div>
            <div class="info-item__margin-right">
          <p class="info-item__text">${comments}</p>
            <p class="info-item__text">Comments</p>
            </div>
            <div class="info-item">
          <p class="info-item__text">${downloads} </p>
          <p class="info-item__text">Downloads</p>
            </div>
        </div>
      </div>`;
      }
    )
    .join('');

  displayGallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
};

export default renderPictures;
