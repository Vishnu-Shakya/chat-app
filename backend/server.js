const express=require('express')
const http=require('http')
const databaseConnect=require('./config/database.js')
const dotenv=require('dotenv')
const authRouter =require('./routes/authRoutes.js')
const bodyParser=require('body-parser')
const cookieParser=require('cookie-parser')
const messengerRouter =require('./routes/messengerRoutes.js')

dotenv.config({
    path:'backend/config/config.env'
})
const app=express()
const PORT=process.env.PORT || 5000

app.use(bodyParser.json())
app.use(cookieParser())
app.use('/api/messenger',authRouter)
app.use('/api/messenger',messengerRouter)

databaseConnect()
app.get('/',(req,res)=>{

    res.send('<h1>this is backend</h1>')
})







app.listen(PORT,()=> {console.log(`server is runnning at port: ${PORT}`)})






// 5000 port is running for airplay if you stop it then it work properly 