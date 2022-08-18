// realizando as importações 
const express = require('express')
const {
    addTrainer,
    getAllTrainers,
    getTrainer,
    updateTrainer,
    deleteTrainer
} = require('../controllers/trainerController')

// inicializando as rotas do express 
const router = express.Router()

// criando as rotas para o recurso 'trainer'
// definindo a rota para a listagem de treinadores
router.get('/trainers', getAllTrainers)

// definindo a rota para cadastro de treinadores
router.post(`/trainers`, addTrainer)

module.exports = {
    routes: router
};