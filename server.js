const express = require('express')
const app = express()

//routes

app.get('/', (req, res) => {
    res.send("tes")
})

app.listen(3000, () => {
    console.log("on port 3000")
})