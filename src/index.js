import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');


input.addEventListener('input', searchBox);

function searchBox(e){
    e.preventDefault()
    debounce(() => {
        const inputValue = e.target.value.trim();
        cleanHtml();

        fetchCountries(inputValue )
        .then(({countrys})=> {
          if(countrys.length >= 10){
            Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")
          }else if(countrys.length === 0){
            Notiflix.Notify.info('Oops, there is no country with that name');
          }
          else if(countrys.length >= 2 && countrys.length <= 10){
            Notiflix.Notify.info();
          }
          return countrys.reduse(
            (markup, country) => createMarkup(country) + markup,
            ""
          )
        })
        .then(updateNewsList)
        .catch(onError)
        .finally(() => input.reset());
      }, DEBOUNCE_DELAY)
}

function createMarkup({name,capital,population,flags,languages}){
  return `
  <div class="country-card">
  <img src=${flags} class="country-card" width="30" hight="20">
  <h2 class="country-name">${name}</h2>
  <h3 class="country-capital">${capital}</h3>
  <p class="country-population">${population}</p>
  <p class="country-languages">${languages}</p>
  </div>
  `;
  
}




function updateNewsList(markup) {
  document.getElementById("countryInfo").innerHTML = markup;
}

function onError(err) {
  console.error(err);
  
}

function cleanHtml() {
    if(inputValue === ''){
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    return;
  }}