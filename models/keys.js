const { Schema, model } = require('mongoose')

const Keys = Schema({
    fillerfind: Number
    validkeys: Array,
})

module.exports = model("Valid Keys", Key)
