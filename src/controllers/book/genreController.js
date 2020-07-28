const genreModel = require('../../models/book/genreModel')
const response = require('../../helper/response')

module.exports = {
  getGenre: (req, res) => {
    const { id } = req.params
    const getGenre = genreModel.getGenre({ id: parseInt(id) })

    getGenre.then((result) => {
      if (result.length < 1) {
        res.status(400).send(response(
          false, 'Genre not found'
        ))
      } else {
        res.status(200).send(response(
          true, 'Get genre success', result
        ))
      }
    }).catch(_ => {
      res.status(400).send(response(
        false, 'Get genre failed'
      ))
    })
  },
  createGenre: (req, res) => {
    const { name } = req.body
    const createGenre = genreModel.createGenre({ name: name })

    createGenre.then(_ => {
      res.status(201).send(response(
        true, 'Create genre success', { name: name }
      ))
    }).catch(_ => {
      res.status(400).send(response(
        false, 'Create genre failed'
      ))
    })
  },
  updateGenre: async (req, res) => {
    const { id } = req.params
    const updateData = req.body
    const checkGenreId = await genreModel.findGenreId({ id: parseInt(id) })

    if (checkGenreId) {
      const data = [updateData, { id: parseInt(id) }]
      const updateGenre = genreModel.updateGenre(data)

      updateGenre.then(_ => {
        res.status(200).send(response(
          true, 'Update genre success', data
        ))
      }).catch(_ => {
        res.status(400).send(response(
          false, 'Update genre failed'
        ))
      })
    } else {
      res.status(400).send(response(
        false, 'Genre not found'
      ))
    }
  },
  deleteGenre: (req, res) => {
    const { id } = req.params
    const deleteGenre = genreModel.deleteGenre({ id: id })

    deleteGenre.then(_ => {
      res.status(200).send(response(
        true, 'Delete genre success', { idGenre: id }
      ))
    }).catch(_ => {
      res.status(400).send(response(
        false, 'Delete genre success'
      ))
    })
  }
}
