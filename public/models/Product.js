class Product {

    // Attributes.
    id
    name

    // Constructor.
    constructor(id, name, category, origin, stock, price_sell, supplier, price_supplier) {
        this.id = id
        this.Name = name 
        this.category = category 
        this.origin = origin 
        this.stock = stock 
        this.price_sell = price_sell 
        this.supplier = supplier 
        this.price_supplier = price_supplier
    }

    /**
     * @param {string} value - Name.
     */
    set Name(value) {
        if(typeof value !== 'string') throw new TypeError(`${value} is not string type.`)
        if(!isNaN(parseInt(value))) throw new TypeError(`${value} is not string type.2`)
        this.name = value
    }

} 
export default Product