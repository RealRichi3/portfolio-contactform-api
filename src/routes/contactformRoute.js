const express = require('express')
const router = express.Router()

const contactform = require('../controllers/contactformController')

router.post('/new', contactform.addNewContactForm)
router.get('/getall', contactform.getAllContactForms)
router.get('/getone', contactform.getContactForm)
// router.patch('/update', contactform.updateContactForm)
router.delete('/deleteone', contactform.deleteContactForm)

module.exports = router;