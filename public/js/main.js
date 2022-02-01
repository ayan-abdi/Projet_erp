import Supplier from "../models/Supplier.js"
import Product from "../models/Product.js"

// Get datas from API.
const products  = await fetchDatas('http://localhost:3000/products')
const suppliers  = await fetchDatas('http://localhost:3000/suppliers')
const customers  = await fetchDatas('http://localhost:3000/customers')

// Create listing datas from API.
createListingDatas(document.querySelectorAll('#menu a[data-listing]'), document.querySelector('#btn-add'))

// // Add suppliers to new product select form.
// createSelectOptions(suppliers, document.querySelector('#product-supplier'))

// // Load countries datas from API and insert them in select.
// loadCountries(document.querySelector("#product-country"))



console.log(document.querySelector('form'))

document.querySelector('form').addEventListener('submit', async (e) => {
    
    // Prevent default behavior.
    e.preventDefault()
    // Retrieve datas from form.
    const formData = new FormData(e.target)
    const datas = Object.fromEntries(formData)
    console.log(datas)

    // Instanciate new product with datas.
    const product = new Product(
        datas["product-id"],
        datas["product-name"], 
        datas["product-category"], 
        datas["product-country"], 
        datas["product-stock"], 
        datas["product-price-sell"], 
        datas["product-supplier"],
        datas["product-price-supplier"]
    )

    console.log(product)

    // Post datas to API.
    fetch('http://localhost:3000/products', {
        method: "post", 
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(product)
    })
    .then(function(response) {
        if (response.ok) {
            // Hide modal after datas sent (jQuery).
            $('#productModal').modal('hide')
            // Reset form.
            document.getElementById("form-product").reset()
        }
    })
    .then(async function() {
        // Fetch new datas.
        const products  = await fetchDatas('http://localhost:3000/products')
        // Reload listing with new data inserted.
        createTable(products, document.querySelector('#listing'))
    })


})