fetch("https://restcountries.com/v3.1/all")
.then(function(response){
    if(response.ok){
        response.json().then(function(countries){
            // console.log(countries);
            // Sort objects in an array alphabetically on one property of the array.
            let countriesSort = countries.sort(function(a, b) {
                var textA = a.name.common;
                var textB = b.name.common;
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            }); 
            // console.log(countriesSort);
            let html = ''
            for (const country of countriesSort) {
                // console.log(country.name.common);
                html += `<option>${country.name.common}</option>`
            }
            const selectCountry = document.querySelector("#product-country"); 
            selectCountry.innerHTML = html
        })
    }
})