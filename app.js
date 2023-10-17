const express = require('express')
const app = express()



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
