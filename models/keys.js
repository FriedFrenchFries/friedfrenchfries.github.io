const { Schema, model } = require('mongoose')

const Keys = Schema({
    validkeys: Array,
})

module.exports = model("Valid Keys", Keys)
