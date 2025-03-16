import express from 'express'
import ConnectToMongo from './db.js';
import router from './routes/RegisterRoute.js';
import topicRoutes from './routes/topicRoutes.js';
import Selectrouter from './routes/questionRoutes.js';
import cors from 'cors';

const app = express();
const port = 5000
ConnectToMongo();

app.use(express.json());

app.use(cors({
    origin:'*',
    allowedHeaders:['Content-Type','authorization'],
    methods:['POST','GET','DELETE','UPDATE']
}))

app.use('/register',router)
app.use("/api/select", topicRoutes);
app.use("/api/topic", Selectrouter);

app.get('/demo',(req,res)=>{
    res.send("Demo Running");
})
app.listen(port,()=>{
    console.log(`Server listen on port ${port}`);
})