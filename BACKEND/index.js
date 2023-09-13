//conexio db BurguerDB
import { MongoClient } from "mongodb"
const url = "mongodb+srv://burguerYon:12345@burguercluster.pyqpavu.mongodb.net/BurguerDB"

//express
import express from "express"
const app = express()

const cliente = new MongoClient(url)



//endpoints

//1 Encontrar todos los ingredientes con stock menor a 400
app.get("/stock400", async (req, res) => {
    try {
        const response = await cliente.db("BurguerDB").collection("Ingredientes").find({ stock: { $lte: 300 } }).toArray()
        console.log(response);
        res.json(response)
    } catch (error) {
        console.log(error);
    }
})


//2 Encontrar todas las hamburguesas de la categoría “Vegetariana”
app.get("/vegetariana", async (req, res) => {
    try {
        const response = await cliente.db("BurguerDB").collection("Hamburguesas").find({ categoria: { $eq: "Vegetariana" } }).toArray()
        console.log(response);
        res.json(response)
    } catch (error) {
        console.log(error);
    }
})


//3 Encontrar todos los chefs que se especializan en “Carnes”
app.get("/chefCarnes", async (req, res) => {
    try {
        const response = await cliente.db("BurguerDB").collection("Chefs").find({ especialidad: { $eq: "Carnes" } }).toArray()
        console.log(response);
        res.json(response)
    } catch (error) {
        console.log(error);
    }
})


//5 Encontrar todas las hamburguesas preparadas por “ChefB”
app.get("/burguerChefB", async (req, res) => {
    try {
        const response = await cliente.db("BurguerDB").collection("Hamburguesas").find({ chef: { $eq: "ChefB" } }).toArray()
        console.log(response);
        res.json(response)
    } catch (error) {
        console.log(error);
    }
})


//6 Encontrar el nombre y la descripción de todas las categorías
app.get("/categorias", async (req, res) => {
    try {
        const response = await cliente.db("BurguerDB").collection("Categorias").find().toArray()
        console.log(response);
        res.json(response)
    } catch (error) {
        console.log(error);
    }
})


//9 Encontrar todas las hamburguesas que contienen “Pan integral” como ingrediente
app.get("/burguerIntegral", async (req, res) => {
    try {
        const response = await cliente.db("BurguerDB").collection("Hamburguesas").find({ingredientes: {$eq:"Pan integral"}}).toArray()
        console.log(response);
        res.json(response)
    } catch (error) {
        console.log(error);
    }
})


//11. Encontrar el ingrediente más caro
app.get("/maxIngrediente", async (req, res) => {
    try {
        const response = await cliente.db("BurguerDB").collection("Ingredientes").find().sort({precio:-1}).limit(1).toArray()
        console.log(response);
        res.json(response)
    } catch (error) {
        console.log(error);
    }
})


//12 Encontrar las hamburguesas que no contienen “Queso cheddar” como ingrediente
app.get("/burguerNotChedar", async (req, res) => {
    try {
        const response = await cliente.db("BurguerDB").collection("Hamburguesas").find({ingredientes: {$ne:"Queso cheddar"}}).toArray()
        console.log(response);
        res.json(response)
    } catch (error) {
        console.log(error);
    }
})


//14 Encontrar todos los ingredientes que tienen una descripción que contiene la palabra “clásico”
app.get("/ingredienteClasico", async (req, res) => {
    try {
        const response = await cliente.db("BurguerDB").collection("Ingredientes").find({descripcion: new RegExp("clásico", "i")}).toArray()
        console.log(response);
        res.json(response)
    } catch (error) {
        console.log(error);
    }
})


//17 Encontrar todas las categorías que contienen la palabra “gourmet” en su descripción
app.get("/categoriaGourmet", async (req, res) => {
    try {
        const response = await cliente.db("BurguerDB").collection("Categorias").find({descripcion: new RegExp("gourmet", "i")}).toArray()
        console.log(response);
        res.json(response)
    } catch (error) {
        console.log(error);
    }
})


//21 Encontrar todos los ingredientes cuyo precio sea entre $2 y $5
app.get("/ingredientesEntre2y5", async (req,res)=>{
    try {
        const response = await cliente.db("BurguerDB").collection("Ingredientes").find({precio:{$gte:2,$lte:5}}).toArray()
        console.log(response);
        res.json(response)
    } catch (error) {
        console.log(error);
    }
})

//23 Encontrar todas las hamburguesas que contienen “Tomate” o “Lechuga” como ingredientes
app.get("/burguerTomateOLechuga",async (req,res)=>{
    try {
        const response = await cliente.db("BurguerDB").collection("Hamburguesas").find({$or:[{ingredientes:"Tomate"},{ingredientes:"Lechuga"}]}).toArray()
        console.log(response);
        res.json(response)
    } catch (error) {
        console.log(error);
    }
})


//27 Encontrar la hamburguesa más cara
app.get("/burguermasCara", async (req,res)=>{
    try {
        const response = await cliente.db("BurguerDB").collection("Hamburguesas").find().sort({precio:-1}).limit(1).toArray()
        console.log(response);
        res.json(response)
    } catch (error) {
        console.log(error);
    }
})

//30 Encontrar todas las hamburguesas que contienen exactamente 7 ingredientes
app.get("/burguer7ingredientes", async (req,res)=>{
    try {
        const response = await cliente.db("BurguerDB").collection("Hamburguesas").find().toArray()

        let x =[]

        response.forEach(element => {
            if(element.ingredientes.length == 7){
                x.push(element);
            };
        })

        console.log(x);
        res.json(x)
    } catch (error) {
        console.log(error);
    }
})


//31 Encontrar la hamburguesa más cara que fue preparada por un chef especializado en “Gourmet”
app.get("/gourmetCara",async(req,res)=>{
    try {
        const response = await cliente.db("BurguerDB").collection("Hamburguesas").find({categoria:{$eq:"Gourmet"}}).sort({precio:-1}).limit(1).toArray()
        res.json(response)
    } catch (error) {
        console.log(error);
    }
})

//34 Encuentra la categoría con la mayor cantidad de hamburguesas

//36 Encontrar todos los ingredientes que no están en ninguna hamburguesa

//38 Encuentra el chef que ha preparado hamburguesas con el mayor número de ingredientes en total

//39 Encontrar el precio promedio de las hamburguesas en cada categoría





//montamos servidor
app.listen(7000)



