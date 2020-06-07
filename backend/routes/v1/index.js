const express = require('express');

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/', (req, res) => res.send('It\'s working'));

module.exports = router;
