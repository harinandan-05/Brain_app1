
import express from 'express';
import router from './Routes';

const app = express();

app.use(express.json());


app.use('/api/v1', router);

app.listen(3000,function(){
    console.log("server is up")
})
