require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const connectDB = require('./db/connect')
const userJwt = require('./routes/userRoutes')



const app = express()

//Midllewares
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static('public'))
app.set('view engine', 'ejs');
app.use('/api/users',userJwt)

//port and env
const PORT = process.env.PORT || 5001
const URI = process.env.URI


//local route setup and connection

app.get('/',(req,res)=>{
    res.render('index')
})

const startDB = async()=>{
    try {
        await connectDB(URI)
        app.listen(PORT,()=>{
            console.log(`Listening on http://localhost:${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}
startDB()

