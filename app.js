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
// const morgan = require('morgan')
const { products } = require('./data')
let { people } = require('./data')

// middleware 
// const logger = require('./logger')
// const authorize = require('./authorize')

// app.use( './api', [logger, authorize])
// app.use(morgan('tiny'))

// app.get('/api/v1/items', [logger, authorize], (req, res) => {
//     console.log(req.query)
//     res.send('Items')
// })

// use express to get static files and middleware functions from the public folder
app.use(express.static(path.join(__dirname, './public')))

// parse json data to data.js from form input
app.use(express.json())
// get all people from people database api

// app.get('/api/v1/people', (req, res) => {
//     const newPeople = people.map((persons) => {
//         const { id, name } = persons
//         return { id, name }
//     })
//     res.json(newPeople)
//     console.log('persons json fetched')
// })

// parse form data
// app.use(express.urlencoded({ extended: false }))


app.get('/api/v1/people', (req, res) => {

    res.status(200).json({ success: true, data: people })
})

// updating database with PUT method

app.put('/api/v1/people/:id', (req, res) => {
    const { id } = req.params
    const { name } = req.body

    const person = people.find((person) => person.id === Number(id))

    if (!person) {
        return res.status(404).json({ success: false, message: `No person with id ${id}` })
    }

    const newPeople = people.map((person) => {
        if (person.id === Number(id)) {
            person.name = name
        }

        return person
    })
    res.status(200).json({ success: true, data: newPeople })
})

// Delete method 

app.delete('/api/v1/people/:id', (req, res) => {

    const person = people.find((person) => person.id === Number(req.params.id))

    if (!person) {
        return res.status(404).json({ success: false, message: `Person with id ${req.params.id} does not exist` })
    }

    // This is the nesw list after the person has been deleted
    const newPeople = people.filter((person) => person.id !== Number(req.params.id))

    // if the person with the spcified ID was found and deleted successfully, return the new list
    res.status(200).json({ success: true, data: newPeople })
})


// posting to people api =  POST METHOD

app.post('/api/v1/people', (req, res) => {
    const { name } = req.body
    if (!name) {
        return res.status(400).json({ success: false, message: 'please provide name' })
    }
    res.status(201).send({ success: true, person: name })
})
app.post('/api/v1/postman/people', (req, res) => {
    const { name } = req.body
    if (!name) {
        return res.status(400).json({ success: false, message: 'please provide name' })
    }
    res.status(201).send({ success: true, data: [...people, name] })
})



// app.post('/login', (req, res) => {
//    const {name} = req.body;
//    if (name) {
//        return res.status(200).send(`Welcome ${name}`);
//    } 

//     res.status(401).send('Please provide name')

// })

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

// Query parameters route to filter products
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

// app.get('/about', (req, res) => {
//     res.sendFile(path.join(__dirname, './public/about.html'))
// })

// app.all('*', (req, res) => {
//     res.status(404).send('<h1> 404 - Resource not found</h1>')
// })

app.listen(5000, function () {
    console.log('server is listening on port 5000 ...')
})