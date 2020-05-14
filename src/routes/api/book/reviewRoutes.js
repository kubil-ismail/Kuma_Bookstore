const router = require('express').Router()
const auth = require('../../../utils/auth')
// const validator = require('../../../middlewares/book/reviewMiddleware')
const { getReview, createReview, updateReview, deleteReview } = require('../../../controllers/book/reviewController')

// Middleware
router.use(auth)

// Routes
router.get('/:id?', getReview)
router.post('/', createReview)
router.patch('/:id', updateReview)
router.delete('/:id', deleteReview)

module.exports = router
