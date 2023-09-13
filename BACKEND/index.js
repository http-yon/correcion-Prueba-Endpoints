//express
import rutas from "./routes/routes.js"
import express from "express"
const app = express()

//dotenv
import dotenv from "dotenv"
dotenv.config()

const port = process.env.PORT121

//router
app.use(express.json());
app.use("/burguer",rutas)

//montamos servidor
app.listen(port,()=>{
    console.log("SERVER RUNNING");
})


