import {MongoClient, ObjectId} from "mongodb"
import dotenv from "dotenv"

dotenv.config()

const URI_DB = process.env.URI_DB || "mongodb://localhost:27017/"
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
        
        switch(operacion){
            case "create":{
                const [titulo, autor, precioStr, stockStr] = args;
                if(!titulo || !autor || !precioStr || !stockStr){
                    console.log("Usar: node ./src/index.js create <titulo> <autor> <precio> <stock>")
                    break
                }
                const nuevoLibro: ILibro = {
                    titulo,
                    autor,
                    precio:Number(precioStr),
                    stock:Number(stockStr)
                }

                const resultado = await coleccion.insertOne(nuevoLibro)
                console.log(`libro creado exitosamente con id: ${resultado.insertedId}`)
                break
            }
            
            case "read": {
                const libros = await coleccion.find().toArray()
                console.log("--- Listado de Libros ---")
    
                if (libros.length === 0) {
                    console.log("No hay libros registrados en la biblioteca.")
                } else {
                    libros.forEach((libro, index) =>  {
                    console.log(`${index + 1}. [ID: ${libro._id}] "${libro.titulo}" - ${libro.autor} | Precio: $${libro.precio} | Stock: ${libro.stock}`)
                    })
                }
                break
            }


            case "update":{
                const [id, titulo, autor, precioStr, stockStr] = args
                if(!id || !titulo || !autor || !precioStr || !stockStr){
                    console.log("Usar: node ./src/index.ts/ update <id> <titulo> <autor> <precio> <stock>")
                    break
                }

                if (!ObjectId.isValid(id)){
                    console.log("Error: el ObjectId provisto no es valido.")
                    break
                }
                const resultado = await coleccion.findOneAndUpdate(
                    {_id: new ObjectId(id)}, 
                    {   
                        $set:{
                            titulo,
                            autor,
                            precio:Number(precioStr),
                            stock: Number(stockStr)
                        }
                    }, 
                    {returnDocument: "after"}
                )
                if(resultado){
                    console.log("Libro actualizado exitosamente: ")
                    console.log(resultado)
                }else{
                    console.log(`No se encontro ningun libro con el ID: ${id}`)
                }
                break
            }
            case "delete":{
                const [id] = args
                if(!id){
                    console.log("Usar: node ./src/index.ts delete <id>")
                    break
                }
                if(!ObjectId.isValid(id)){
                    console.log("error: el ObjectId provisto no es valido")
                    break
                }

                const resultado = await coleccion.deleteOne({_id: new ObjectId(id)})
                if(resultado.deletedCount > 0){
                    console.log(`libro con ID ${id} eliminado correctamente.`)
                }else {
                    console.log(`no se encontro ningun libro con el ID ${id}.`)
                }
                break               
            }
            default:
                console.log("operacion no reconocida o no provista.")
                console.log("operaciones disponibles: create, read, update, delete")
                break
        }
    } catch(error) {
        console.error("Error durante la ejecucion: ", error)
    }finally{
        await client.close()
    }
}
main()

