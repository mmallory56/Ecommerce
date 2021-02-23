import mongoose from 'mongoose'
import colors from 'colors'
const connectDB = async()=>{
    try{
        const conn = await mongoose.connect(process.env.MongoDb,
            {
                useUnifiedTopology: true,
                useNewUrlParser: true,
                useCreateIndex:true,
                useFindAndModify:false
            })
          
            console.log(`mongoDB connected: ${conn.connection.host}`.cyan.underline)
    }catch(error){
        console.log(error.message.red.underline.bold)
        process.exit(1);
    }
}

export default connectDB;