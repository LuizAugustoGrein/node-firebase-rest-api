'use strict'

//definindo imports
const firebase = require('../db')
const Trainer = require('../models/trainer')
const firestore = firebase.firestore()

//criando o metodo para adicioonar um novo treinador
const addTrainer = async(req,res,next) => {
    try {
      //criando uma constante para receber o conteudo da requisiçao
      const data = req.body
      //executando o metodo da classe firestore que ira gravar o documento no banco
      await firestore.collection('trainers').doc().set(data)
      res.status(201).send('Treinador salvo com sucesso!')
    }
    catch(error){
      res.status(400).send(error.message)
    }
}
//criando um metodo para listar todos os trainadores
const getAllTrainers = async (req,res,next) => {
    try{
      // criando um objeto para receber a coleçao 'trainers'
      const trainers = await firestore.collection('trainers')
      //criando uma constante para receber os documentos da coleçao
      const data = await trainers.get()
      //criando um array vazio que ira receber os treinadires
      const trainersArray = []
      //testando se ha documentos ou nao na coleçao
      if (data.empty) {
        res.status(404).send('Não há treinadores cadastrados!')
      } else {
        data.forEach(doc => {
            const trainer = new Trainer(
                doc.id,
                doc.data().name,
                doc.data().userName,
                doc.data().email,
                doc.data().password,
                doc.data().birthDate,
                doc.data().age,
                doc.data().genre,
                doc.data().city,
                doc.data().state
            )
            trainersArray.push(trainer)
        })
        res.status(200).send(trainersArray)
      }
    } catch(error) {
      res.status(400).send(error.message)
    }
}
// criando o metodo para listar um treinador especifico
const getTrainer = async (req, res, next) => {
  try {
    //criando um objeto para receber o parametro 'id' da requisiçao
    const id = req.params.id
    //criando um objeto para receber a consulta pelo documento na 'firestore'
    const trainer = await firestore.collection('trainers').doc(id)
    //criando um objeto para receber o documento
    const data = await trainer.get()
    //testando se existe um documento
    if(!data.exists){
      res.status(404).send("Não foi encontrado um trainador com o ID informado!")
    }
    else {
      res.status(200).send(data.data())
    }
  }
  catch(error) {
    res.status(400).send(error.message)
  }
}

//criando o metodo pra atualizar um treinador especifico
const updateTrainer = async (req, res, next) => {
  try{
    //criando um objeto para receber o parametro id
    const id = req.params.id
    //criando um objeto para receber o corpo
    const data = req.body
    //criando um objeto para receber a consulta no'firestore'
    const trainer = await firestore.collection('trainers').doc(id)
    //realizando atualizaçao
    await trainer.update(data)
    res.status(201).send('Treinadoe atualizado com sucesso')
  } catch (error) {
    res.status(400).send(error.message)
  }
}
//criando um metodo para excluir um treinador especifico
const deleteTraier = async (req, res, next) => {
  try {
  //criando um objeto par receber o parametro id da requisuçao
  const id = req.params.id
  //reaizando a exclusao do documento
  await firestore.collection('trainers').doc(id).delete()
  res.status(200).send('Treinador excluido com sucesso')
} catch (error) {
  res.status(400).send(error.message)
}
}

module.exports = {
  addTrainer,
  getAllTrainers,
  getTrainer,
  updateTrainer,
  deleteTraier
}