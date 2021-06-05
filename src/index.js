import './sass/main.scss';
import pictTpl from './templates/pict.hbs';
import LoadMore from './js/load-more-btn';
import getRefs from './js/get-refs';
import ApiService from './js/apiService';

const refs = getRefs();

const apiService = new ApiService();

const loadMoreBtn = new LoadMore({
  selector: '[data-action="load-more"]',
  hidden: true,
});

refs.searchForm.addEventListener('submit', onSubmit)
loadMoreBtn.refs.button.addEventListener('click', fetchImage);

function onSubmit(e) {
  e.preventDefault();

  apiService.query = e.currentTarget.elements.query.value;
   if (apiService.query === '') {
    return alert('Enter something');;
  }

  loadMoreBtn.show();
  clearGallery();
  apiService.resetPage();
  fetchImage();
}

function fetchImage() {
  loadMoreBtn.disable();
  apiService.fetchImages().then(pict => {
    addPictMarkup(pict);
    loadMoreBtn.enable();
  });
  }

function addPictMarkup(pict) {
  refs.gallery.insertAdjacentHTML('beforeend', pictTpl(pict));
  loadMoreBtn.refs.button.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}
