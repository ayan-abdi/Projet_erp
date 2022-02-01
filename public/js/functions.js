/**
 * Function - Fetch datas.
 * @param {String} url - URL of the API to fetch.
 * @returns Object with datas.
 */
 async function fetchDatas(url) {
    return fetch(url)
    .then(res => res.json())
}

/**
 * Function - Capitalize first letter.
 * @param {String} string - String to capitalize first letter.
 * @returns Given string with first letter capitalized.
 */
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

function loadCountries(selectElem) {
    fetch("https://restcountries.com/v3.1/all")
    .then(function(response){
        if(response.ok){
            response.json().then(function(countries){
                // Sort objects in an array alphabetically on one property of the array.
                let countriesSort = countries.sort(function(a, b) {
                    var textA = a.name.common
                    var textB = b.name.common
                    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0
                })
                let html = ''
                for (const country of countriesSort) {
                    html += `<option>${country.name.common}</option>`
                }
                if(selectElem) {
                    selectElem.innerHTML = html
                }
            })
        }
    })
}

/**
 * Function - Create Listing of datas from API.
 * @param {array} arrayLinks - Links that have data-listing attribute.
 * @param {html} inputSubmit - Input type submit button.
 */
function createListingDatas(arrayLinks, inputSubmit) {
    // For each link.
    for (const link of arrayLinks) {
        link.addEventListener('click', async function(e) {
            // Cancel default behavior.
            e.preventDefault()

            
// Fetch datas from API.
const datas = await fetchDatas(window.location.origin + '/' + this.dataset.listing + 's')
// Create HTML products listing table.
createTable(datas, document.querySelector('#listing'))
// Set attributes to add button.
inputSubmit.setAttribute('value', 'Add a ' + capitalizeFirstLetter(this.dataset.listing))
inputSubmit.setAttribute('data-page', this.dataset.listing)
inputSubmit.setAttribute('data-bs-target', '#' + this.dataset.listing + 'Modal')
// On add button click.
inputSubmit.addEventListener('click', function(e) {
    // Stop Immediate propagation if click on multiples menu btns before add item.
    e.stopImmediatePropagation()
    // Create HTML element to include.
    let html = document.createElement('div')
    html.setAttribute('w3-include-html', `form-${this.dataset.page}.html`)
    html.setAttribute('id', `form-${this.dataset.page}`)
    // Insert HTML element.
    document.body.appendChild(html)
    // Include.
    includeHTML()
    // If page is PRODUCT.
    if (this.dataset.page === 'product') {
        (async function() {
            // Fetch suppliers datas from API.
            const suppliers  = await fetchDatas(window.location.origin + '/suppliers')
            // Add suppliers to new product select form.
            createSelectOptions(suppliers, document.querySelector('#product-supplier'))
            // Load countries datas from API and insert them in select.
            loadCountries(document.querySelector("#product-country"))
        })()
    }
})




        })
    }
}

/**
 * Function - Create select options with datas and insert it into HTML DOM element.
 * @param {Array} datas - Array of datas.
 * @param {html} htmlElem - DOM HTML element.
 */
function createSelectOptions(datas, htmlElem) {
    let html = ''
    for (const data of datas) {
        html += `<option>${data.name}</option>`
    }
    if(htmlElem) {
        htmlElem.innerHTML = html
    }
}

/**
 * Function - Create HTML table with datas and insert it into DOM HTML element.
 * @param {Array} datas - Array of datas.
 * @param {html} htmlElem - DOM HTML element.
 */
function createTable(datas, htmlElem) {

    let html = ''
    // If at least 1 data exists.
    if(datas.length > 0) {
        html += `<table>`
        html += `<tr>`
        for (const key of Object.keys(datas[0])) {
            html += `<th>${key}</th>`
        }
        html += `</tr>`
        for (const data of datas) {
            html += `<tr>` 
            for (const value of Object.values(data)) {
                html += `<td>${value}</td>` 
            }
            html += `</tr>`
        }
        html += `</table>`
        
        htmlElem.innerHTML = html
    } else {
        // No product in API database.
        html = '<span>There is no product.</span>'
        htmlElem.innerHTML = html
    }
}
