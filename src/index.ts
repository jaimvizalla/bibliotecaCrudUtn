import {MongoClient, ObjectId} from "mongodb"
import dotenv from "dotenv"

dotenv.config()

const URI_DB = process.env.URI_DB || " mongodb://localhost:27017/"
const DB_NAME = process.env.DB_NAME || "bibliotecaCrudUTN"

interface ILibro {
    _id?: ObjectId
    titulo: string
    autor: string
    precio:number
    stock:number
}

async function main(){
    const client = new MongoClient(URI_DB)
    try {
        await client.connect()
        const db = client.db(DB_NAME)
        const coleccion = db.collection<ILibro>("libros")

        const [ , , operacion, ...args] = process.argv
    }
}

//connectMongoDb()
const argumentos = process.argv.splice(2)
console.log(argumentos)
const accion = argumentos[0]