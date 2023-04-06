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
        <img class="photo" src="${webformatURL}" alt="${tags}" height="137" loading="lazy" />
        </a>
        <div class="info">
          <p class="info-item">${likes}
            <b>Likes</b>
          </p>
          <p class="info-item">${views}
            <b>Views</b>
          </p>
          <p class="info-item">${comments}
            <b>Comments</b>
          </p>
          <p class="info-item">${downloads}
            <b>Downloads</b>
          </p>
        </div>
      </div>`;
      }
    )
    .join('');

  displayGallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
};

export default renderPictures;
