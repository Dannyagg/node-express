// app.get - what the user is trying to request through the broser
// app.post - create content
// app.put - update content
// app.delete - delete content
// app.all used to apply condition for all methods
// app.use - used to set up middleware
// app.listen used to set up listeners

const express = require('express')
const path = require('path')
const app = express()

// importing people router from routes/people JS file
const peopleRouter = require('./routes/peopleRoute')

// importing login router from routes/loginRouter JS file
const loginRouter = require('./routes/loginRoute')

// const morgan = require('morgan')

const { products } = require('./data')

// middleware 
// const logger = require('./logger')
// const authorize = require('./authorize')

// app.use('./api', [logger, authorize])
// app.use(morgan('tiny'))

// app.get('/api/v1/items', [logger, authorize], (req, res) => {
//     console.log(req.query)
//     res.send('Items')
// })

// use express to get static files and middleware functions from the public folder
app.use(express.static(path.join(__dirname, './public')))

// Parse form data
app.use(express.urlencoded({ extended: false }))

// parse json data to data.js from form input - must come before routes
app.use(express.json())

// base path for all routes for people api
app.use('/api/v1/people', peopleRouter)
app.use('/login', loginRouter)

// get all products from products database api
app.get('/api/v1/products', (req, res) => {
    const newProducts = products.map((product) => {
        const { id, name, image } = product;
        return { id, name, image }
    })
    res.json(newProducts);

})

// get single product from products database api
app.get('/api/v1//products/:productID', (req, res) => {
    const { productID } = req.params;
    const singleProduct = products.find((product) => product.id === Number(productID))
    if (!singleProduct) {
        return res.status(404).send('Product Does not Exist')
    }
    return res.json(singleProduct)
})

app.get('/api/products/:productID/reviews/:reviewID', (req, res) => {
    console.log(req.params)
    res.send('hello world')
})

// query parameters route to filter products
// http://localhost:3000/api/v1/query?search=a&limit=3

app.get('/api/v1/query', (req, res) => {
    // console.log(req.query)
    const { search, limit } = req.query
    let sortedProducts = [...products]

    if (search) {
        sortedProducts = sortedProducts.filter((product) => {
            return product.name.startsWith(search)
        })
    }
    if (limit) {
        sortedProducts = sortedProducts.slice(0, Number(limit))
    }
    res.status(200).json(sortedProducts)

    if (sortedProducts.length < 1) {

        // res.status(200).send('No product matched your search');
        return res.status(200).json({ success: true, data: [] })
    }

    res.status(200).json(sortedProducts)
})

app.listen(5000, function () {
    console.log('server is listening on port 5000 ...')
})