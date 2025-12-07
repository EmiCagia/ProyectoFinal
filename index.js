import "dotenv/config"
import express from "express"
import cors from "cors"
import productsRouter from './src/routes/products.routes.js';
import authRouter from './src/routes/auth.routes.js';  

const app = express();

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
console.log(`Server running at: http://localhost:${PORT}`)
});

app.use('/api', productsRouter);
app.use('/auth', authRouter); 

app.use((req,res) => {
    res.status(404).json({error:"Ruta no encontrada"});
}) 

