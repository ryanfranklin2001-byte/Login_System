const express = require("express");
const cors = require("cors");
const path = require('path')

const authRoutes = require("./routes/auth");

const app = express();
const PORT = 3001

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../Frontend")));

app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname,'../Frontend/index.html'));
})

app.use("/api", authRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
});