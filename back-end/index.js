const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

const filmesRouter = require("./routes/filmes.routes");

app.use("/filmes", filmesRouter);

const port = 3000;


app.listen(port, () => {
    console.log(`App rodando na porta ${port}`);
})