const loadApi = async (inputId, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${inputId}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhone(data.data, dataLimit);
}



const displayPhone = (phones, dataLimit) => {
    const container = document.getElementById('phone-container');
    container.innerHTML = ``;
    const noMes = document.getElementById('no-message');
    if (phones.length === 0) {
        noMes.classList.remove('d-none');
    }
    else {
        noMes.classList.add('d-none');
    }
    const showBtn = document.getElementById('showAll');
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showBtn.classList.remove('d-none');
    }
    else {
        showBtn.classList.add('d-none');
    }
    phones.forEach(phone => {
        const div = document.createElement('div')
        div.innerHTML = `
            <div class="col container">
                        <div class="card h-100 w-75">
                            <img src="${phone.image}" class="card-img-top  w-75 mx-auto my-3" alt="...">
                            <div class="card-body d-flex align-items-center flex-column">
                        <h5 class="card-title">${phone.phone_name}</h5>
                        <button onclick="showDetails('${ phone.slug}')" type="button" class="btn btn-primary mt-3" data-bs-toggle="modal" data-bs-target="#phoneDetails">Show Details</button>
                            </div>
                        </div>
                    </div> 

        `
        container.append(div);
    });
    showSpinner(0);
}
const showSpinner = inputID => {
    const check = document.getElementById('showSpinner');
    if (inputID === 1) {
        check.classList.remove('d-none');
    }
    else {
        check.classList.add('d-none')
    }
}

const processSearch = (dataLimit) => {
    showSpinner(1);
    const input = document.getElementById('input-field');
    const inputText = input.value;
    loadApi(inputText, dataLimit);
}
//clicking search button 
document.getElementById('search-button').addEventListener('click', function () {
    processSearch(10);
});
//by entering
document.getElementById('input-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        processSearch(10);
    }

})
document.getElementById('btnShow').addEventListener('click', function () {
    processSearch();
})
const showDetails = async(id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    modalDetails(data.data);
}

const modalDetails = data => {
    console.log(data);
    const phoneName = document.getElementById('phoneDetailsLabel');
    phoneName.innerText = data.name;
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
    <p>Brand : ${data.brand ? data.brand : 'No data available'}</p>
    <p>Release Data : ${data.releaseDate ? data.releaseDate : 'No data available'}</p>
    <p>Chipset : ${data.mainFeatures.chipSet ? data.mainFeatures.chipSet : 'No data available'}</p>
    <p>Memory : ${data.mainFeatures.memory ? data.mainFeatures.memory : 'No name available'}</p>
    `
}
loadApi('a');