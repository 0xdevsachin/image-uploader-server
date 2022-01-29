const express = require('express')
const app = express()

app.use(express.json())

const PORT = process.env.PORT ||  3300

app.get('/', (req,res) =>{
    console.log(req.body)
    res.send('Image Uploader')
})

app.listen(PORT, () =>{
    console.log(`Server started at https://localhost:${PORT}`)
})

