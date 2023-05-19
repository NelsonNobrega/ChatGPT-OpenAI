const express = require("express")
const app = express()
const handlebars = require("express-handlebars").engine
const bodyParser = require("body-parser")
const post = require("./models/post")
const { Configuration, OpenAIApi } = require("openai");
const readlineSync = require("readline-sync");
require("dotenv").config();
const axios = require("axios");

const configuration = new Configuration({
  apiKey: "sk-BDq6yLtnu3S6r1ccNRVtT3BlbkFJTUNaW3k73ZqgCtWTNpE",
});
const openai = new OpenAIApi(configuration);

app.engine("handlebars", handlebars({defaultLayout: "main"}))
app.set("view engine", "handlebars")

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.get("/", function(req, res){
  res.render("primeira_pagina")
})

app.post("/", async (req, res) => {
  const { produto, marca, modelo } = req.body
  const prompt = `Produto: ${produto}\nMarca: ${marca}\nModelo: ${modelo}\nDescrição:`;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/engines/davinci-codex/completions",
      {
        prompt,
        max_tokens: 100,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${"sk-BDq6yLtnu3S6r1ccNRVtT3BlbkFJTUNaW3k73ZqgCtWTNpE"}`,
        },
      }
    );

    const descricao = response.data.choices[0].text.trim();
    const palavra = [
      produto,
      marca,
      modelo,
      "palavra1",
      "palavra2",
      "palavra3",
    ].join(", ");

    await Product.create({ produto, marca, modelo, descricao, palavra });

    res.render("primeira_pagina", { descricao, palavra });
  } catch (error) {
    console.error(error);
    res.render("primeira_pagina", {
      error: "Ocorreu um erro ao gerar a descrição e palavras-chave.",
    });
  }
});

// Inicializar o servidor
app.listen(8082, () => {
  console.log("Servidor está funcionando");
});
