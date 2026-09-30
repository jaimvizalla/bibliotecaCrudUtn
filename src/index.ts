import {connect} from "mongoose"
process.loadEnvFile()

const URI_DB = process.env.URI_DB || ""
const connectDb = async(URI : string) =>{
    try{
        await connect(URI)
        console.log("conectando ala BD mongo")
    }catch(e){
        console.log("error al conectar ala BD mongo")
    }
}

//connectMongoDb()
const argumentos = process.argv.splice(2)
console.log(argumentos)
const accion = argumentos[0]