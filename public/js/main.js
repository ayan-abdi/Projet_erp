import Product from "../models/Product.js"

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

// Post datas from form.
document.querySelector('#product-form').addEventListener('submit', (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const datas = Object.fromEntries(formData)
    console.log(datas);
    // console.log(datas.valueOf);
    const product = new Product(
        datas["product-id"],
        datas["product-name"], 
        datas["product-category"], 
        datas["product-country"], 
        datas["product-stock"], 
        datas["product-price-sell"], 
        datas["product-supplier"],
        datas["product-price-supplier"], 
        datas["product-image"].name
    )
    console.log(product);

    fetch('http://localhost:3000/products', {
        method: "post", 
        headers: {
            "Accept": "application/json", 
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify(product)
    })
})
  

