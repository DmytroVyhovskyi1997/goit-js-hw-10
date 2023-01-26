import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Lodash from 'lodash.debounce';
import Notiflix from 'notiflix';

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 300;


input.addEventListener('input', Lodash(onInput, DEBOUNCE_DELAY))
function onInput(e){
  e.preventDefault();
    const inputValue = input.value.trim();
       cleanHtml();   
  
      fetchCountries(inputValue).then(countries => {      

      if (countries.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (countries.length === 0) {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      } else if (countries.length >= 2 && countries.length <= 10) {
       
        renderList(countries );
      } else if (countries.length === 1) {
  
        renderCountry(countries );
      }
    });
    
  }
  


function renderList(users)  {
  const markup = users
    .map((user) => { return `<div>
    <img src="${user.flags.svg}" alt="Flag of ${
      user.name.official
    }" width="30" hight="20">
       <b>${user.name.official}</p>
       </div>`;})
       .join("");
       countryList.innerHTML = markup;
  
}

function renderCountry(users) {
  const markup = users
    .map((user) => {
      return `<div>
      <img src="${user.flags.svg}" alt="Flag of ${
        user.name.official
          }" width="30" hight="20">
         <b>${user.name.official}</b></p>
            <p><b>Capital</b>: ${user.capital}</p>
            <p><b>Population</b>: ${user.population}</p>
            <p><b>Languages</b>: ${Object.values(user.languages)} </p>
                </div>`;
    })
    .join("");
    countryList.innerHTML = markup;
}


function cleanHtml() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}