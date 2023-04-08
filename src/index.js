import Notiflix from 'notiflix';
/* import axios from 'axios'; */
import getAllPictures from './fetchPictures';
import renderPictures from './renderPictures';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

/* const request = axios.create({
  baseURL: 'https://pixabay.com/api',
}); */

const qs = s => document.querySelector(s);

const searchButton = qs('button');

const form = qs('form');

const textPicture = qs('input');

const displayGallery = qs('.gallery');

const buttonLoadMore = qs('.load-more');

buttonLoadMore.classList.add('is-hidden');
let page;
const perPage = 40;

const getPhotos = async e => {
  try {
    e.preventDefault();
    displayGallery.innerHTML = '';
    page = 1;

    const pictures = await getAllPictures(perPage, page);
    const { totalHits: totalAmountofPhotos, hits: allPhotos } = pictures;

    if (totalAmountofPhotos === 0) {
      Notiflix.Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      Notiflix.Notify.info(`Hooray! We found ${totalAmountofPhotos} images.`);
    }

    /*   const { hits } = data; */

    renderPictures(allPhotos);
    const limit = totalAmountofPhotos / perPage;
    if (limit > 1) {
      buttonLoadMore.classList.remove('is-hidden');
    }
  } catch {
    console.log('error');
  }
};

form.addEventListener('submit', getPhotos);

const getMorePictures = async () => {
  try {
    page++;
    const pictures = await getAllPictures(perPage, page);
    const { totalHits: totalAmountofPhotos, hits: allPhotos } = pictures;
    const limit = totalAmountofPhotos / perPage;

    renderPictures(allPhotos);

    if (limit < page) {
      Notiflix.Notify.info(
        `We're sorry, but you've reached the end of search results.`
      );
      buttonLoadMore.classList.add('is-hidden');
      const name = qs('input');
      name.value = '';
    }
  } catch {
    console.log('error');
  }
};

buttonLoadMore.addEventListener('click', getMorePictures);
