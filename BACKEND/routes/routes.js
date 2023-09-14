import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.DDBB121;
const router = express.Router();
const dbName = "BurguerDB";

//endpoints

//1 Encontrar todos los ingredientes con stock menor a 400
router.get("/ejercicio1", async (req, res) => {
  try {
    const cliente = new MongoClient(uri);
    cliente.connect();
    const response = await cliente
      .db(dbName)
      .collection("Ingredientes")
      .find({ stock: { $lte: 300 } })
      .toArray();
    res.json(response);
    cliente.close();
  } catch (error) {
    console.log(error);
  }
});

//2 Encontrar todas las hamburguesas de la categoría “Vegetariana”
router.get("/ejercicio2", async (req, res) => {
  try {
    const cliente = new MongoClient(uri);
    cliente.connect();
    const response = await cliente
      .db(dbName)
      .collection("Hamburguesas")
      .find({ categoria: { $eq: "Vegetariana" } })
      .toArray();
    console.log(response);
    res.json(response);
    cliente.close();
  } catch (error) {
    console.log(error);
  }
});

//3 Encontrar todos los chefs que se especializan en “Carnes”
router.get("/ejercicio3", async (req, res) => {
  try {
    const cliente = new MongoClient(uri);
    cliente.connect();
    const response = await cliente
      .db(dbName)
      .collection("Chefs")
      .find({ especialidad: { $eq: "Carnes" } })
      .toArray();
    console.log(response);
    res.json(response);
    cliente.close();
  } catch (error) {
    console.log(error);
  }
});

//4 Aumentar en 1.5 el precio de todos los ingredientes
router.get("/ejercicio4", async (req, res) => {
  try {
    const cliente = new MongoClient(uri);
    cliente.connect();
    const response = await cliente
      .db(dbName)
      .collection("Ingredientes")
      .updateMany({}, { $mul: { precio: 1.5 } });
    res.json(response);
    cliente.close();
  } catch (error) {
    console.log(error);
  }
});

//5 Encontrar todas las hamburguesas preparadas por “ChefB”
router.get("/ejercicio5", async (req, res) => {
  try {
    const cliente = new MongoClient(uri);
    cliente.connect();
    const response = await cliente
      .db(dbName)
      .collection("Hamburguesas")
      .find({ chef: { $eq: "ChefB" } })
      .toArray();
    console.log(response);
    res.json(response);
    cliente.close();
  } catch (error) {
    console.log(error);
  }
});

//6 Encontrar el nombre y la descripción de todas las categorías
router.get("/ejercicio6", async (req, res) => {
  try {
    const cliente = new MongoClient(uri);
    cliente.connect();
    const response = await cliente
      .db(dbName)
      .collection("Categorias")
      .find()
      .toArray();
    console.log(response);
    res.json(response);
    cliente.close();
  } catch (error) {
    console.log(error);
  }
});

//7. Eliminar todos los ingredientes que tengan un stock de 0
router.get("/ejercicio7", async (req, res) => {
  try {
    const cliente = new MongoClient(uri);
    cliente.connect();
    const response = await cliente
      .db(dbName)
      .collection("Ingredientes")
      .deleteMany({ stock: 0 });
    res.json(response);
    cliente.close();
  } catch (error) {
    console.log(error);
  }
});

//8. Agregar un nuevo ingrediente a la hamburguesa “Clásica”
router.get("/ejercicio8", async (req, res) => {
  try {
    const cliente = new MongoClient(uri);
    cliente.connect();

    const response = await cliente
      .db(dbName)
      .collection("Hamburguesas")
      .updateOne(
        { nombre: "Clásica" },
        { $push: { ingredientes: "Ingrediente Nuevo" } }
      );
    res.json(response);
    cliente.close();
  } catch (error) {
    console.log(error);
  }
});

//9 Encontrar todas las hamburguesas que contienen “Pan integral” como ingrediente
router.get("/ejercicio9", async (req, res) => {
  try {
    const cliente = new MongoClient(uri);
    cliente.connect();
    const response = await cliente
      .db(dbName)
      .collection("Hamburguesas")
      .find({ ingredientes: { $eq: "Pan integral" } })
      .toArray();
    console.log(response);
    res.json(response);
    cliente.close();
  } catch (error) {
    console.log(error);
  }
});

//10 Cambiar la especialidad del “ChefC” a “Cocina Internacional
router.get("/ejercicio10", async (req, res) => {
  try {
    const cliente = new MongoClient(uri);
    cliente.connect();

    const response = await cliente
      .db(dbName)
      .collection("Chefs")
      .updateOne(
        { nombre: "ChefC" },
        { $set: { especialidad: "Cocina Internacional" } }
      );
    res.json(response);
    cliente.close();
  } catch (error) {
    console.log(error);
  }
});

//11. Encontrar el ingrediente más caro
router.get("/ejercicio11", async (req, res) => {
  try {
    const cliente = new MongoClient(uri);
    cliente.connect();
    const response = await cliente
      .db(dbName)
      .collection("Ingredientes")
      .find()
      .sort({ precio: -1 })
      .limit(1)
      .toArray();
    console.log(response);
    res.json(response);
    cliente.close();
  } catch (error) {
    console.log(error);
  }
});

//12 Encontrar las hamburguesas que no contienen “Queso cheddar” como ingrediente
router.get("/ejercicio12", async (req, res) => {
  try {
    const cliente = new MongoClient(uri);
    cliente.connect();
    const response = await cliente
      .db(dbName)
      .collection("Hamburguesas")
      .find({ ingredientes: { $ne: "Queso cheddar" } })
      .toArray();
    console.log(response);
    res.json(response);
    cliente.close();
  } catch (error) {
    console.log(error);
  }
});

//13 Incrementar el stock de “Pan” en 100 unidades
router.get("/ejercicio13", async (req, res) => {
  try {
    const cliente = new MongoClient(uri);
    cliente.connect();
    const response = await cliente
      .db(dbName)
      .collection("Ingredientes")
      .updateOne({ nombre: "Pan" }, { $inc: { stock: 100 } });
    res.json(response);
    cliente.close();
  } catch (error) {
    console.log(error);
  }
});

//14 Encontrar todos los ingredientes que tienen una descripción que contiene la palabra “clásico”
router.get("/ejercicio14", async (req, res) => {
  try {
    const cliente = new MongoClient(uri);
    cliente.connect();
    const response = await cliente
      .db(dbName)
      .collection("Ingredientes")
      .find({ descripcion: new RegExp("clásico", "i") })
      .toArray();
    console.log(response);
    res.json(response);
    cliente.close();
  } catch (error) {
    console.log(error);
  }
});

//15. Listar las hamburguesas cuyo precio es menor o igual a $9
router.get("/ejercicio15", async (req, res) => {
  try {
    const cliente = new MongoClient(uri);
    cliente.connect();
    const response = await cliente
      .db(dbName)
      .collection("Hamburguesas")
      .find({ precio: { $lte: 9 } })
      .toArray();
    res.json(response);
    cliente.close();
  } catch (error) {
    console.log(error);
  }
});

//16. Contar cuántos chefs hay en la base de datos
router.get("/ejercicio16", async (req, res) => {
  try {
    const cliente = new MongoClient(uri);
    cliente.connect();
    const response = await cliente
      .db(dbName)
      .collection("Chefs")
      .find()
      .toArray();
    res.json(response.length);
    cliente.close();
  } catch (error) {
    console.log(error);
  }
});

//17 Encontrar todas las categorías que contienen la palabra “gourmet” en su descripción
router.get("/ejercicio17", async (req, res) => {
  try {
    const cliente = new MongoClient(uri);
    cliente.connect();
    const response = await cliente
      .db(dbName)
      .collection("Categorias")
      .find({ descripcion: new RegExp("gourmet", "i") })
      .toArray();
    console.log(response);
    res.json(response);
    cliente.close();
  } catch (error) {
    console.log(error);
  }
});

//18. Eliminar las hamburguesas que contienen menos de 5 ingredientes
router.get("/ejercicio18", async (req, res) => {
  try {
    const cliente = new MongoClient(uri);
    cliente.connect();
    const response = await cliente
      .db(dbName)
      .collection("Hamburguesas")
      .deleteMany({$expr: { $lt: [{ $size: "$ingredientes" }, 5]}});

    res.json(response);
    cliente.close();
  } catch (error) {
    console.log(error);
  }
});


//19. Agregar un nuevo chef a la colección con una especialidad en “Cocina Asiática”
router.get("/ejercicio19", async (req, res) => {
    try {
      const cliente = new MongoClient(uri);
      cliente.connect();
      
    const data = {
        "nombre": "ChefD",
        "especialidad": "Cocina Asiática"
    }

      const response = await cliente
        .db(dbName)
        .collection("Chefs")
        .insertOne(data)
       
      console.log(response);
      res.json(response);
      cliente.close();
    } catch (error) {
      console.log(error);
    }
  });


//20. Listar las hamburguesas en orden ascendente según su precio
router.get("/ejercicio20", async (req, res) => {
    try {
      const cliente = new MongoClient(uri);
      cliente.connect();
    
      const response = await cliente
        .db(dbName)
        .collection("Hamburguesas")
        .find()
        .sort({ precio: -1 })
        .toArray();
      res.json(response);
      cliente.close();
    } catch (error) {
      console.log(error);
    }
  });

//21 Encontrar todos los ingredientes cuyo precio sea entre $2 y $5
router.get("/ejercicio21", async (req, res) => {
  try {
    const cliente = new MongoClient(uri);
    cliente.connect();
    const response = await cliente
      .db(dbName)
      .collection("Ingredientes")
      .find({ precio: { $gte: 2, $lte: 5 } })
      .toArray();
    console.log(response);
    res.json(response);
    cliente.close();
  } catch (error) {
    console.log(error);
  }
});

//22 Actualizar la descripción del “Pan” a “Pan fresco y crujiente”
router.get("/ejercicio22", async (req, res) => {
    try {
      const cliente = new MongoClient(uri);
      cliente.connect();
      const response = await cliente
            .db(dbName)
            .collection("Ingredientes")
            .updateOne(
                { nombre: "Pan" },
                { $set: { descripcion: "Pan fresco y crujiente" } }
            );
      res.json(response);
      cliente.close();
    } catch (error) {
      console.log(error);
    }
  });

//23 Encontrar todas las hamburguesas que contienen “Tomate” o “Lechuga” como ingredientes
router.get("/ejercicio23", async (req, res) => {
  try {
    const cliente = new MongoClient(uri);
    cliente.connect();
    const response = await cliente
      .db(dbName)
      .collection("Hamburguesas")
      .find({ $or: [{ ingredientes: "Tomate" }, { ingredientes: "Lechuga" }] })
      .toArray();
    console.log(response);
    res.json(response);
    cliente.close();
  } catch (error) {
    console.log(error);
  }
});

////////////////////////////////////////////////////////////////////
//24. Listar todos los chefs excepto “ChefA”
//25. Incrementar en $2 el precio de todas las hamburguesas de la categoría “Gourmet”
//26. Listar todos los ingredientes en orden alfabético

//27 Encontrar la hamburguesa más cara
router.get("/ejercicio27", async (req, res) => {
  try {
    const cliente = new MongoClient(uri);
    cliente.connect();
    const response = await cliente
      .db(dbName)
      .collection("Hamburguesas")
      .find()
      .sort({ precio: -1 })
      .limit(1)
      .toArray();
    console.log(response);
    res.json(response);
    cliente.close();
  } catch (error) {
    console.log(error);
  }
});

//28. Agregar “Pepinillos” a todas las hamburguesas de la categoría “Clásica”
//29. Eliminar todos los chefs que tienen una especialidad en “Cocina Vegetariana”

//30 Encontrar todas las hamburguesas que contienen exactamente 7 ingredientes
router.get("/ejercicio30", async (req, res) => {
  try {
    const cliente = new MongoClient(uri);
    cliente.connect();
    const response = await cliente
      .db(dbName)
      .collection("Hamburguesas")
      .find()
      .toArray();

    let x = [];

    response.forEach((element) => {
      if (element.ingredientes.length == 7) {
        x.push(element);
      }
    });

    console.log(x);
    res.json(x);
    cliente.close();
  } catch (error) {
    console.log(error);
  }
});

//31 Encontrar la hamburguesa más cara que fue preparada por un chef especializado en “Gourmet”
router.get("/ejercicio31", async (req, res) => {
  try {
    const cliente = new MongoClient(uri);
    cliente.connect();
    const response = await cliente
      .db(dbName)
      .collection("Hamburguesas")
      .find({ categoria: { $eq: "Gourmet" } })
      .sort({ precio: -1 })
      .limit(1)
      .toArray();
    res.json(response);
    cliente.close();
  } catch (error) {
    console.log(error);
  }
});

//32. Listar todos los ingredientes junto con el número de hamburguesas que los contienen
//33. Listar los chefs junto con el número de hamburguesas que han preparado

//34 Encuentra la categoría con la mayor cantidad de hamburguesas
router.get("/ejercicio34", async (req, res) => {
  try {
    const cliente = new MongoClient(uri);
    cliente.connect();

    const pipeline = [
      {
        $group: {
          _id: "$categoria",
          total: { $sum: 1 },
        },
      },
      {
        $sort: { total: -1 },
      },
      {
        $limit: 1,
      },
    ];

    const response = await cliente
      .db(dbName)
      .collection("Hamburguesas")
      .aggregate(pipeline)
      .toArray();
    res.json(response);
    cliente.close();
  } catch (error) {
    console.log(error);
  }
});

//35 Listar todos los chefs y el costo total de ingredientes de todas las hamburguesas que han preparado

//36 Encontrar todos los ingredientes que no están en ninguna hamburguesa
router.get("/ejercicio36", async (req, res) => {
  try {
    const cliente = new MongoClient(uri);
    cliente.connect();

    const response1 = await cliente
      .db(dbName)
      .collection("Hamburguesas")
      .distinct("ingredientes");
    const response2 = await cliente
      .db(dbName)
      .collection("Ingredientes")
      .distinct("nombre");

    const x = response2.filter((fil) => !fil.includes(response1));
    res.json(x);
    cliente.close();
  } catch (error) {
    console.log(error);
  }
});

//37 Listar todas las hamburguesas con su descripción de categoría

//38 Encuentra el chef que ha preparado hamburguesas con el mayor número de ingredientes en total
router.get("/ejercicio38", async (req, res) => {
  try {
    const cliente = new MongoClient(uri);
    cliente.connect();

    const data = [
      {
        $group: {
          _id: "$ingredientes",
        },
      },
    ];

    const response = await cliente
      .db(dbName)
      .collection("Hamburguesas")
      .aggregate(data)
      .toArray();
    res.json(response);

    cliente.close();
  } catch (error) {
    console.log(error);
  }
});

//39 Encontrar el precio promedio de las hamburguesas en cada categoría
router.get("/ejercicio39", async (req, res) => {
  try {
    const cliente = new MongoClient(uri);
    await cliente.connect();

    const data = [
      {
        $group: {
          _id: "$categoria",
          precioPromedio: { $avg: "$precio" },
        },
      },
    ];

    const result = await cliente
      .db(dbName)
      .collection("Hamburguesas")
      .aggregate(data)
      .toArray();

    res.json(result);
    cliente.close();
  } catch (error) {
    console.log(error);
  }
});

//40 Listar los chefs y la hamburguesa más cara que han preparado

export default router;
