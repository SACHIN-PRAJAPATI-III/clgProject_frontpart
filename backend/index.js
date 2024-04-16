const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
// const bodyParser = require("body-parser")
const app = express()
const Routes = require("./routes/route.js")
const { errorMiddleware } = require("./error.middleware.js")

const PORT = process.env.PORT || 5000

dotenv.config();

// app.use(bodyParser.json({ limit: '10mb', extended: true }))
// app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))

app.use(express.json({ limit: '10mb' }))
app.use(cors())
app.use('/', Routes);
app.use(errorMiddleware)

console.log(process.env.MONGO_URL)

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGO_URL)
        console.log(`\n mongoDb connected !! DB Host ${connectionInstance.connection.host}`,)
    } catch (error) {
        console.log("Mongodb connection error",error)
        process.exit(1)
    }
}


connectDB().then(() => {
    
    app.listen(process.env.PORT || 5000, () => {
        console.log("Server is started successfully on port: ", process.env.PORT)
    })

    app.on("error",(err)=>{
        console.log("server failed to start ",err)
    })
}).catch((err) => {
    console.log("Mongodb connection failed !!!", err)
})


