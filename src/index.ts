import {connect} from "mongoose"

const connectMongoDb = async () => {
    try{
        await connect("mongodb://localhost:27017")
        console.log("¡conectado con exito!")
    }catch(error){
        console.log("error al conectarse a mongo")
    }
}

connectMongoDb()
