

// Fetch datas.
fetch("http://localhost:3000/products")
    .then(function (response) {
        console.log(response);
        if (response.ok) {
            response.json().then(function (products) {
                console.log(products);
                let html = ''
                html += `<table>`
                html += `<tr>`
                for (const key of Object.keys(products[0])) {
                    html += `<th>${key}</th>`
                }
                html += `</tr>`
                for (const product of products) {
                    html += `<tr>` 
                    // console.log(product);
                    for (const value of Object.values(product)) {
                        html += `<td>${value}</td>` 
                    }
                    html += `</tr>`
                }
                html += `</table>`

                // Selector.
                const listing = document.querySelector('#listing')
                listing.innerHTML = html
            })
        }
    })