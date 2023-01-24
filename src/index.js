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
        const inputValue = e.input.value.trim();
        cleanHtml();

        fetchCountries(countries)
        .then()
        .catch(error => Notiflix.Notify.failure('Oops, there is no country with that name'));

      }, DEBOUNCE_DELAY)
}

function cleanHtml() {
    if(inputValue === ''){
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
  }}