const trafficloggerModel = require('../models/trafficlog.model');

module.exports = app => {
    const trafficLogger = require('../controllers/trafficlogger.controller')

    var router = require("express").Router();

    router.get("/", trafficLogger.findAll)
    router.get("/:id", trafficLogger.findOne)
    
    router.post("/", trafficLogger.create)

    router.put("/:id", trafficLogger.update)
    router.delete("/:id", trafficLogger.delete)
    router.delete("/", trafficLogger.deleteAll)

    app.use('/api/trafficlogger', router)
}