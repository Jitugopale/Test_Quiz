import mongoose from 'mongoose'

const ConnectToMongo = async()=>{
    await mongoose
    .connect('mongodb+srv://tanmay:tanmay@cluster1.hghgj.mongodb.net/tanmay?retryWrites=true&w=majority&appName=Cluster1')
    .then(()=>{console.log("DB Connected")})
    .catch((err)=>console.error("DB error:",err))
}

export default ConnectToMongo;