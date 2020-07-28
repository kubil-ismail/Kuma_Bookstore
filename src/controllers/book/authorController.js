const authorModel = require('../../models/book/authorModel')
const response = require('../../helper/response')

module.exports = {
  getAuthor: (req, res) => {
    const { id } = req.params
    const getAuthor = authorModel.getAuthor({ id: parseInt(id) })

    getAuthor.then((result) => {
      if (result.length < 1) {
        res.status(400).send(response(
          false, 'Author not found'
        ))
      } else {
        res.status(200).send(response(
          true, 'Get author success', result
        ))
      }
    }).catch(_ => {
      res.status(400).send(response(
        false, 'Get author failed'
      ))
    })
  },
  createAuthor: (req, res) => {
    const { name } = req.body
    const createAuthor = authorModel.createAuthor({ name: name })

    createAuthor.then(_ => {
      res.status(201).send(response(
        true, 'Create author success', { name: name }
      ))
    }).catch(_ => {
      res.status(400).send(response(
        false, 'Create author failed'
      ))
    })
  },
  updateAuthor: async (req, res) => {
    const { id } = req.params
    const { name } = req.body
    const checkAuthorId = await authorModel.findAuthorId({ id: parseInt(id) })

    if (checkAuthorId) {
      const data = [{ name: name, update_at: new Date() }, { id: parseInt(id) }]
      const updateAuthor = authorModel.updateAuthor(data)

      updateAuthor.then(_ => {
        res.status(200).send(response(
          true, 'Update author success', { idAuthor: id, name: name }
        ))
      }).catch(_ => {
        res.status(400).send(response(
          false, 'Update author failed'
        ))
      })
    } else {
      res.status(400).send(response(
        false, 'Author not found'
      ))
    }
  },
  deleteAuthor: (req, res) => {
    const { id } = req.params
    const deleteAuthor = authorModel.deleteAuthor({ id: id })

    deleteAuthor.then(_ => {
      res.status(200).send(response(
        true, 'Delete author success', { idAuthor: id }
      ))
    }).catch(_ => {
      res.status(400).send(response(
        false, 'Delete author failed'
      ))
    })
  }
}
