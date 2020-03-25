const express = require('express')
const routes = express.Router()
const OngController = require('./controllers/OngController')
const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

// Login 
routes.post('/sessions', SessionController.create)

// Criando ONS
routes.post('/ongs', OngController.create)

// Listando ONS
routes.get('/ongs', OngController.index)

// Listando casos específicos de uma ONG
routes.get('/profile', ProfileController.index)

// Criando Casos
routes.post('/incidents', IncidentController.create)

// Listando Casos 
routes.get('/incidents', IncidentController.index)

// Deletando Casos
routes.delete('/incidents/:id', IncidentController.delete)

module.exports = routes