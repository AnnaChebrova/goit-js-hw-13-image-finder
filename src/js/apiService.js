const KEY = '21945016-35782941565d1dfa523c4c56b';
const BASE_URL = 'https://pixabay.com/api/';

export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImages() {
    const url = `${BASE_URL}/?key=${KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&page=${this.page}&per_page=12`;

    return fetch(url)
      .then(response => response.json())
      .then(({ hits }) => {
        this.incrementPage();
        return hits;
      });
  }

 incrementPage() {
    this.page += 1;
  }
    
  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
