import Notiflix from 'notiflix';
import { search } from './api-staff';
import imgMarkup from './img-markup.hbs'

const form = document.querySelector('form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const input = document.querySelector('input'); 

let curPage = 1;
// let hits = 0;

loadMoreBtn.style.display = 'none';

form.addEventListener('submit', onSub);

async function onSub(event) {
    event.preventDefault();
    gallery.innerHTML = '';
    loadMoreBtn.style.display = 'none';
    curPage = 1;
    const res = await search(input.value);
    const hits = res.data.hits;
    if (hits.length === 0) {
        return Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    }
    makeMarkup(res.data.hits);
    if (res.data.totalHits < 40) {
        loadMoreBtn.style.display = 'none';
        return Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
    }
    loadMoreBtn.style.display = 'block';
};
async function makeMarkup(imgs) {
    gallery.innerHTML += imgs.map(el => imgMarkup(el));
};
loadMoreBtn.addEventListener('click',loadMore)
async function loadMore() {
    curPage+=1
    const res = await search(input.value, curPage);
    makeMarkup(res.data.hits);
    if (res.data.hits.length < 40) {
        loadMoreBtn.style.display = 'none';
        return Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
    }
};
function checkImg(imgCount) {
    if (imgCount < 40) {
        loadMoreBtn.style.display = 'none';
        return Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
    }
}