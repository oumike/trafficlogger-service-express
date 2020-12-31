const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const db = require("./app/models")

const app = express()

app.use(cors({
    origin: "http://localhost:3000"
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to mongodb.")
    })
    .catch(err => {
        console.log("Could not connect, error message: " + err)
        process.exit()
    })

const PORT = process.env.PORT || 8080
require("./app/routes/trafficlogger.routes")(app)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})