const express = require('express')
const router = express.Router()

const newsletter = require('../controllers/newsletterController')

router.get('/getall', newsletter.getAllSubscriptions)
router.post('/subscribe', newsletter.subscribeToNewsletter)
router.delete('/unsubscribe', newsletter.unsubscribeFromNewsletter)

module.exports = router;