import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv"
dotenv.config()

const uri = process.env.DDBB121
const router = express.Router()
const dbName = "BurguerDB"

//endpoints

//1 Encontrar todos los ingredientes con stock menor a 400
router.get("/ejercicio1", async (req, res) => {
    try {
        const cliente = new MongoClient(uri)
        cliente.connect()
        const response = await cliente.db(dbName).collection("Ingredientes").find({ stock: { $lte: 300 } }).toArray()
        res.json(response)
        cliente.close()
    } catch (error) {
        console.log(error);
    }
})


//2 Encontrar todas las hamburguesas de la categoría “Vegetariana”
router.get("/ejercicio2", async (req, res) => {
    try {
        const cliente = new MongoClient(uri)
        cliente.connect()
        const response = await cliente.db(dbName).collection("Hamburguesas").find({ categoria: { $eq: "Vegetariana" } }).toArray()
        console.log(response);
        res.json(response)
        cliente.close()
    } catch (error) {
        console.log(error);
    }
})


//3 Encontrar todos los chefs que se especializan en “Carnes”
router.get("/ejercicio3", async (req, res) => {
    try {
        const cliente = new MongoClient(uri)
        cliente.connect()
        const response = await cliente.db(dbName).collection("Chefs").find({ especialidad: { $eq: "Carnes" } }).toArray()
        console.log(response);
        res.json(response)
        cliente.close()
    } catch (error) {
        console.log(error);
    }
})


//5 Encontrar todas las hamburguesas preparadas por “ChefB”
router.get("/ejercicio5", async (req, res) => {
    try {
        const cliente = new MongoClient(uri)
        cliente.connect()
        const response = await cliente.db(dbName).collection("Hamburguesas").find({ chef: { $eq: "ChefB" } }).toArray()
        console.log(response);
        res.json(response)
        cliente.close()
    } catch (error) {
        console.log(error);
    }
})


//6 Encontrar el nombre y la descripción de todas las categorías
router.get("/ejercicio6", async (req, res) => {
    try {
        const cliente = new MongoClient(uri)
        cliente.connect()
        const response = await cliente.db(dbName).collection("Categorias").find().toArray()
        console.log(response);
        res.json(response)
        cliente.close()
    } catch (error) {
        console.log(error);
    }
})


//9 Encontrar todas las hamburguesas que contienen “Pan integral” como ingrediente
router.get("/ejercicio9", async (req, res) => {
    try {
        const cliente = new MongoClient(uri)
        cliente.connect()
        const response = await cliente.db(dbName).collection("Hamburguesas").find({ ingredientes: { $eq: "Pan integral" } }).toArray()
        console.log(response);
        res.json(response)
        cliente.close()
    } catch (error) {
        console.log(error);
    }
})


//11. Encontrar el ingrediente más caro
router.get("/ejercicio11", async (req, res) => {
    try {
        const cliente = new MongoClient(uri)
        cliente.connect()
        const response = await cliente.db(dbName).collection("Ingredientes").find().sort({ precio: -1 }).limit(1).toArray()
        console.log(response);
        res.json(response)
        cliente.close()
    } catch (error) {
        console.log(error);
    }
})


//12 Encontrar las hamburguesas que no contienen “Queso cheddar” como ingrediente
router.get("/ejercicio12", async (req, res) => {
    try {
        const cliente = new MongoClient(uri)
        cliente.connect()
        const response = await cliente.db(dbName).collection("Hamburguesas").find({ ingredientes: { $ne: "Queso cheddar" } }).toArray()
        console.log(response);
        res.json(response)
        cliente.close()
    } catch (error) {
        console.log(error);
    }
})


//14 Encontrar todos los ingredientes que tienen una descripción que contiene la palabra “clásico”
router.get("/ejercicio14", async (req, res) => {
    try {
        const cliente = new MongoClient(uri)
        cliente.connect()
        const response = await cliente.db(dbName).collection("Ingredientes").find({ descripcion: new RegExp("clásico", "i") }).toArray()
        console.log(response);
        res.json(response)
        cliente.close()
    } catch (error) {
        console.log(error);
    }
})


//17 Encontrar todas las categorías que contienen la palabra “gourmet” en su descripción
router.get("/ejercicio17", async (req, res) => {
    try {
        const cliente = new MongoClient(uri)
        cliente.connect()
        const response = await cliente.db(dbName).collection("Categorias").find({ descripcion: new RegExp("gourmet", "i") }).toArray()
        console.log(response);
        res.json(response)
        cliente.close()
    } catch (error) {
        console.log(error);
    }
})


//21 Encontrar todos los ingredientes cuyo precio sea entre $2 y $5
router.get("/ejercicio21", async (req, res) => {
    try {
        const cliente = new MongoClient(uri)
        cliente.connect()
        const response = await cliente.db(dbName).collection("Ingredientes").find({ precio: { $gte: 2, $lte: 5 } }).toArray()
        console.log(response);
        res.json(response)
        cliente.close()
    } catch (error) {
        console.log(error);
    }
})

//23 Encontrar todas las hamburguesas que contienen “Tomate” o “Lechuga” como ingredientes
router.get("/ejercicio23", async (req, res) => {
    try {
        const cliente = new MongoClient(uri)
        cliente.connect()
        const response = await cliente.db(dbName).collection("Hamburguesas").find({ $or: [{ ingredientes: "Tomate" }, { ingredientes: "Lechuga" }] }).toArray()
        console.log(response);
        res.json(response)
        cliente.close()
    } catch (error) {
        console.log(error);
    }
})


//27 Encontrar la hamburguesa más cara
router.get("/ejercicio27", async (req, res) => {
    try {
        const cliente = new MongoClient(uri)
        cliente.connect()
        const response = await cliente.db(dbName).collection("Hamburguesas").find().sort({ precio: -1 }).limit(1).toArray()
        console.log(response);
        res.json(response)
        cliente.close()
    } catch (error) {
        console.log(error);
    }
})

//30 Encontrar todas las hamburguesas que contienen exactamente 7 ingredientes
router.get("/ejercicio30", async (req, res) => {
    try {
        const cliente = new MongoClient(uri)
        cliente.connect()
        const response = await cliente.db(dbName).collection("Hamburguesas").find().toArray()

        let x = []

        response.forEach(element => {
            if (element.ingredientes.length == 7) {
                x.push(element);
            };
        })

        console.log(x);
        res.json(x)
        cliente.close()
    } catch (error) {
        console.log(error);
    }
})


//31 Encontrar la hamburguesa más cara que fue preparada por un chef especializado en “Gourmet”
router.get("/ejercicio31", async (req, res) => {
    try {
        const cliente = new MongoClient(uri)
        cliente.connect()
        const response = await cliente.db(dbName).collection("Hamburguesas").find({ categoria: { $eq: "Gourmet" } }).sort({ precio: -1 }).limit(1).toArray()
        res.json(response)
        cliente.close()
    } catch (error) {
        console.log(error);
    }
})

//34 Encuentra la categoría con la mayor cantidad de hamburguesas
router.get("/ejercicio34", async (req,res)=>{
    try {
        const cliente = new MongoClient(uri)
        cliente.connect()
        const response  = await cliente.db(dbName).collection("Hamburguesas").find().toArray()
        
        res.json(response)
        cliente.close()
    } catch (error) {
        console.log(error);
    }
})


//36 Encontrar todos los ingredientes que no están en ninguna hamburguesa

//38 Encuentra el chef que ha preparado hamburguesas con el mayor número de ingredientes en total

//39 Encontrar el precio promedio de las hamburguesas en cada categoría

export default router