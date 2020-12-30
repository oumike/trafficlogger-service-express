const dbConfig = require('../config/db.config')

const mongoose = require("mongoose")
mongoose.Promise = global.Promise

const db = {}
db.mongoose = mongoose
db.url = dbConfig.url
db.trafficlogs = require("../models/trafficlog.model.js")(mongoose)

module.exports = db