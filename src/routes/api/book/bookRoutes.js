const router = require('express').Router()
const auth = require('../../../utils/auth')
const validator = require('../../../middlewares/book/bookMiddleware')
const { getBook, createBook, updateBook, updateCoverBook, deleteBook } = require('../../../controllers/book/bookController')

// Middleware
// router.use(auth)

// Routes
router.get('/:id?', getBook)
  .post('/', auth, createBook)
  .patch('/:id', auth, validator, updateBook)
  .patch('/cover/:id', auth, updateCoverBook)
  .delete('/:id', auth, deleteBook)

module.exports = router
