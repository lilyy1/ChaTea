const express = require('express')
const router = express.Router()
const { getMatch, addMatch, deleteMatch } = require('../controllers/matchController')

router.route('/').get(getMatch).post(addMatch)
// Delete a match
router.delete('/:id', deleteMatch)

module.exports = router
