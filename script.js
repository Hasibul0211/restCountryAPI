document.getElementById('search-btn').addEventListener('click', function () {

    const inputField = document.getElementById('search-field');
    const inputFieldValue = inputField.value;
    inputField.value = '';
    if (inputFieldValue == '') {
        document.getElementById('errors').innerHTML = `<p>empty input cannot be accepted</p>`
        console.log('empty')
    }
    else {
        document.getElementById('errors').innerHTML = ''
        const url = `https://restcountries.eu/rest/v2/name/${inputFieldValue}`;
        fetch(url)
            .then(res => res.json())
            .then(data => getCountry(data))
    }


});

function getCountry(Countries) {
    if (Countries.message === "Not Found") {
        document.getElementById('errors').innerHTML = `<p>Data not found</p>`;
    } else {
        document.getElementById('errors').innerHTML = '';
        const containerDiv = document.getElementById('container-div');
        containerDiv.textContent = '';
        for (const country of Countries) {
            // console.log(country.alpha3Code)
            const div = document.createElement('div');
            div.classList.add('col')
            div.innerHTML = `
            <div class="card h-100">
                <img src="${country.flag}" class="card-img-top img-fluid" alt="country img">
                <div class="card-body">
                    <h5 class="card-title">${country.name}</h5>
                    <p class="card-text"></p>
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                            data-bs-target="#exampleModal" onclick=countryDetail('${country.alpha3Code}')>Read more..
                    </button>
                </div>
            </div>
        `;
            containerDiv.appendChild(div)
        }
    }
}



function countryDetail(alpha3Code) {
    const url = `https://restcountries.eu/rest/v2/alpha/${alpha3Code}`
    console.log(url)
    fetch(url)
        .then(res => res.json())
        .then(data => finalOutput(data))


}

function finalOutput(detail) {
    console.log(detail)

    const singleDetails = document.getElementById('single-details');
    singleDetails.textContent = '';
    const divTwo = document.createElement('div');
    divTwo.classList.add("modal-content");
    divTwo.innerHTML = `
        <div class="modal-header">
                <h2 class="modal-title" id="exampleModalLabel">${detail.name}</h2>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                <div><img src="${detail.flag}" class="card-img-top" alt="country img" style="height: 200px;"></div>
                <h5 class="text-center pt-1 text-capitalize">Capital: ${detail.capital}</h5>
                <p class="text-center pt-1 text-capitalize">Nationality: ${detail.demonym}</p>
                <p class="text-center pt-1 text-capitalize">Currencies: ${detail.currencies[0].name}</p>
                <p class="text-center pt-1 text-capitalize">Population: ${detail.population}</p>
                <p class="text-center pt-1 text-capitalize">Area: ${detail.area}</p>
                <p class="text-center pt-1 text-capitalize">Region: ${detail.region}</p>
                
                </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>

`;
    singleDetails.appendChild(divTwo);
}

