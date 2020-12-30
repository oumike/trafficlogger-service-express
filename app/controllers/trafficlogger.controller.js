const db = require('../models')
const TrafficLog = db.trafficlogs

exports.create = (req, res) => {

    // TODO: What other required fields?  
    if (!req.body.name)
        return res.status(400).send({ message: "Fields are missing yo." })

    const tl = new TrafficLog({
        name: req.body.name,
        day: req.body.day
    })

    tl
        .save(tl)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500) .send({
                message: err.message || "Creation failed."
            })
        })

}

exports.findAll = (req, res) => {
    TrafficLog.find({})
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Having issues getting all logs."
            })
        })
}

exports.findByName = (req, res) => {
    const name = req.query.name
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

    TrafficLog.find(condition)
        .then(data => {
            res.send(data)
        })
        .catch (err => {
            res.status(500).send({
                message: err.message || "Having issues with query."
            })
        })

}

exports.findByDay = (req, res) => {

    const day = req.query.name
    var condition = day ? { day: { $regex: new RegExp(day), $options: "i" } } : {};

    TrafficLog.find(condition)
        .then(data => {
            res.send(data)
        })
        .catch (err => {
            res.status(500).send({
                message: err.message || "Having issues with query."
            })
        })

}

exports.findOne = (req, res) => {
    const id = req.params.id

    TrafficLog.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Cannot find log with id: " + id })
            else res.send(data)
        })
        .catch(err => {
            res.status(500).send({ 
                message: err.message || "Error getting log with id: " + id 
            })
        })
}

exports.update = (req, res) => {
    if (!req.body)
        return res.status(400).send({
            message: "Must have data to update."
        })

    const id = req.params.id

    TrafficLog.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update log with id ${id}.`
                })
            } else { 
                res.send({
                    message: "Updated successfully."
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Error updating log with id ${id}`
            })
        })
}

exports.delete = (req, res) => {
    const id = req.params.id

    TrafficLog.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete log with id ${id}`
                })
            } else {
                res.send({
                    message: "Traffic log deleted successfully."
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Error deleting log with id ${id}`
            })
        })
}

exports.deleteAll = (req, res) => {
    TrafficLog.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} logs were deleted.`
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Issue deleting all.  Why are you even trying?"
            })
        })
}