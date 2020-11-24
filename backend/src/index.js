// Rotas
// /users users é um recurso

// Tipos de Parâmetros
// Query params: Parâmetros nomeados enviados na rota após o símbolo de ? para filtros
// Route params: Parâmetros utilizados para identificar recursos
// Request body: Corpo da requisição utilizado para criar ou alterar recursos

// req.query for Query params
// req.params for Route params
// req.body for Request body

const express = require('express')
const cors = require('cors')

const { errors } = require('celebrate')

const routes = require('./routes')

const app = express()

// Adicionando CORS na aplicação
app.use(cors())

// Declarando o uso de JSON para o APP
app.use(express.json())
app.use(routes)

// Tratando erros
app.use(errors())

app.listen(3333)