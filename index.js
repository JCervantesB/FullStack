
import express from "express";
import dotenv from "dotenv"
import conectarDB from "./config/db.js";
import VeterinarioRoutes from "./routes/VeterinarioRoutes.js";

const app = express();
app.use(express.json());  /*  aqui se  habilita para poder enviar informacion con el metodo post desde postMan */
dotenv.config();

conectarDB();

app.use('/api/veterinarios', VeterinarioRoutes);

/*  app.use('/',(req,res)=>{
   res.send('hola mundo estoy desde nodemon')
 }); */

const PORT = process.env.PORT || 4000

app.listen(PORT, ()=>{
    console.log('puerto listo 4000');
});

