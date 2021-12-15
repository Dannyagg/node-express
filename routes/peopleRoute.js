const express = require('express');
const router = express.Router();
const {
    getPeople,
    createPerson,
    createPersonPostman,
    updatePerson,
    deletePerson,
} = require('../controller/people')

//  first method to set up routes
router.get('/', getPeople)

router.post('/', createPerson)

router.post('/postman', createPersonPostman)

router.put('/:id', updatePerson)

router.delete('/:id', deletePerson)


//  second method to set up routes by chaining

// router.route('/').get(getPeople).post(createPerson)
// router.route('/postman').post(createPersonPostman)
// router.route('/:id').put(updatePerson).delete(deletePerson)

module.exports = router