'use strict'

//definindo imports
const firebase = require('../db')
const Pokemon = require('../models/pokemon')
const firestore = firebase.firestore()

//criando o metodo para adicioonar um novo treinador
const addPokemon = async(req,res,next) => {
    try {
      //criando uma constante para receber o conteudo da requisiçao
      const data = req.body
    //executando o metodo da classe firestore que ira gravar o documento no banco
      await firestore.collection('pokemons').doc().set(data)
      res.status(201).send('Pokemon salvo com sucesso!')
    }
    catch(error){
      res.status(400).send(error.message)
    }
}

//criando um metodo para listar todos os trainadores
const getAllPokemons = async (req,res,next) => {
    try{
      // criando um objeto para receber a coleçao 'pokemons'
      const pokemons = await firestore.collection('pokemons')
      //criando uma constante para receber os documentos da coleçao
      const data = await pokemons.get()
      //criando um array vazio que ira receber os treinadires
      const pokemonsArray = []
      //testando se ha documentos ou nao na coleçao
      if (data.empty) {
        res.status(404).send('Não há pokemons cadastrados!')
      } else {
        data.forEach(doc => {
          // para cada documento do banco sera criando um novo objeto da classe Pokemon
            const pokemon = new Pokemon(
                doc.id,
                doc.data().number,
                doc.data().name,
                doc.data().type,
                doc.data().description,
                doc.data().weight,
                doc.data().height
            )
            pokemonsArray.push(pokemon)
        })
        res.status(200).send(pokemonsArray)
      }
    } catch(error) {
      res.status(400).send(error.message)
    }
}

// criando o metodo para listar um treinador especifico
const getPokemon = async (req, res, next) => {
  try {
    //criando um objeto para receber o parametro 'id' da requisiçao
    const id = req.params.id
    //criando um objeto para receber a consulta pelo documento na 'firestore'
    const pokemon = await firestore.collection('pokemons').doc(id)
    //criando um objeto para receber o documento
    const data = await pokemon.get()
    //testando se existe um documento
    if(!data.exists){
      res.status(404).send("Não foi encontrado um pokemon com o ID informado!")
    }
    else {
      res.status(200).send(data.data())
    }
  }
  catch(error) {
    res.status(400).send(error.message)
  }
}

//criando o metodo pra atualizar um pokemon especifico
const updatePokemon = async (req, res, next) => {
  try{
    //criando um objeto para receber o parametro id
    const id = req.params.id
    //criando um objeto para receber o corpo
    const data = req.body
    //criando um objeto para receber a consulta no'firestore'
    const pokemon = await firestore.collection('pokemons').doc(id)
    //realizando atualizaçao
    await pokemon.update(data)
    res.status(201).send('Pokemon atualizado com sucesso')
  } catch (error) {
    res.status(400).send(error.message)
  }
}

//criando um metodo para excluir um pokemon especifico
const deletePokemon = async (req, res, next) => {
  try {
  //criando um objeto par receber o parametro id da requisuçao
  const id = req.params.id
  //reaizando a exclusao do documento
  await firestore.collection('pokemons').doc(id).delete()
  res.status(200).send('Pokemon excluido com sucesso')
} catch (error) {
  res.status(400).send(error.message)
}
}

module.exports = {
  addPokemon,
  getAllPokemons,
  getPokemon,
  updatePokemon,
  deletePokemon
}