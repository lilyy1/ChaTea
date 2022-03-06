// @desc: Get Matches
// @route: GET /api/matches
// @access Private
const getMatch = (req, res) => {
    res.status(200).json({message: 'Get Matches'})
}

// @desc: Add Matches
// @route: POST /api/matches
// @access Private
const addMatch = (req, res) => {
    res.status(200).json({message: 'Add Match'})
}

// @desc: Get Matches
// @route: DELETE /api/matches
// @access Private
const deleteMatch = (req, res) => {
    res.status(200).json({message: `Delete Match ${req.params.id}`})
}

module.exports = {
    getMatch, addMatch, deleteMatch
}