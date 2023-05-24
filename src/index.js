import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
countryList.style.listStyle = 'none';
countryList.style.paddingLeft = '0';

const countryInfo = document.querySelector('.country-info');
countryInfo.style.listStyle = 'none';

function onInputText(e) {
  if (!e.target.value.trim()) {
    return countryListReset();
  }

  fetchCountries(e.target.value.trim())
    .then(countries => renderCountriesList(countries))
    .catch(error => {
      console.log(error);
      countryListReset();
    });
}

function countryListReset() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}

function renderCountriesList(countries) {
  countryListReset();

  if (countries.length > 10) {
    return Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }

  const markup = countries.reduce((acc, country) => {
    return (acc += `<li>
        <div style="display:flex; align-items:center"><div style="display:inline-flex; align-items:center"><img src="${country.flags.svg}" alt="flag" width = 40></div>
        <h1 class="title"; style="font-size:20px; padding-left:10px", "line-height:1.5">${country.name.official}</h1></divstyle=>
        </li>`);
  }, '');

  countryList.insertAdjacentHTML('beforeend', markup);

  const markupInfo = countries.reduce((acc, country) => {
    if (countries.length === 1) {
      const title = document.querySelector('.title');
      title.style.fontSize = '40px';
      return (acc += `<li>
          <p><b>Capital:</b> ${country.capital}</p>
        </li>
        <li>
          <p><b>Population:</b> ${country.population}</p>
        </li>
        <li>
          <p><b>Languages:</b> ${Object.values(country.languages)}</p>
        </li>`);
    }
    return acc;
  }, '');

  countryInfo.insertAdjacentHTML('beforeend', markupInfo);
}

input.addEventListener('input', debounce(onInputText, DEBOUNCE_DELAY));
