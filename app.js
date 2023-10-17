const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()

//Midllewares
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static('public'))

//port and env
const PORT = process.env.PORT || 5001
const URI = process.env.URI


//local route setup and connection

app.get('/',(req,res)=>{
    res.send("Hello node JS")
})

app.listen(PORT,()=>{
    console.log(`Listening on http://localhost:${PORT}`)
})
