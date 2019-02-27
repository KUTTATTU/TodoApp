var express = require('express');
var router = express.Router();
var authHelper = require('../helpers/auth');

/* GET /authorize. */
exports.author = async function(req, res, next) {
    // Get auth code
    const code = req.query.code;
    // If code is present, use it
    if (code) {
        try {
            username = await authHelper.getTokenFromCode(code);
        } catch (error) {
            res.end('Error exchanging code for token');
        }

        res.end("welcome " + username);
    } else {
        // Otherwise complain
        res.end('Authorization error->Missing code parameter');
    }
}