// app.get - what the user is trying to request through the broser
// app.post
// app.put
// app.delete
// app.all uses it for all methods
// app.use - used to set up middleware
// app.listen

const express = require('express')
const path = require('path')
const app = express()
const { products } = require('./data')


// use express to get static files and middleware functions from the public folder
app.use(express.static(path.join(__dirname, './public')))

// get all products from products database api

app.get('/products', (req, res) => {
    const newProducts = products.map((product) => {
        const { id, name, image } = product;
        return { id, name, image }
    })
    res.json(newProducts);
})

// get single product from products database api
app.get('/products/:productID', (req, res) => {
    const { productID } = req.params;
    const singleProduct = products.find((product) => product.id === Number(productID))
    res.json(singleProduct)
})

// app.get('/about', (req, res) => {
//     res.sendFile(path.join(__dirname, './public/about.html'))
// })

app.all('*', (req, res) => {
    res.status(404).send('<h1> resource not found</h1>')
})

app.listen(3000, function () {
    console.log('listening on port 5000 ...')
})