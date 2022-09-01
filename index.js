// definindo o strict mode
'use strict'

//definindo imports
const express = require('express')
const cors = require('cors')
const config = require('./config')
const trainerRoutes = require('./routes/trainer-routes')
const pokemonRoutes = require('./routes/pokemon-routes')

// inicializando o express
const app = express()

//definindo a utilizaçao de JSON no corpo da requisiçao
// (body parser)
app.use(express.json())

//definindo a utilização do cors
// (frontend)
app.use(cors())

// utilizando as rotas para treinadores
app.use('/api', trainerRoutes.routes)
app.use('/api', pokemonRoutes.routes)

//definindo a porta onde o servidor esta ouvindo
app.listen(config.port, () => console.log('API rodando em http://localhost:' + config.port))







// Definindo imports
/*const express = require("express");
const cors = require("cors");
const firebase = require("firebase");

const firebaseConfig = {
    apiKey: "AIzaSyD7P07gnaxHU5fGy9fOvNzw44cgt1qh77I",
})
    authDomain: "node-firebase-rest-api-5d7cc.firebaseapp.com",
    projectId: "node-firebase-rest-api-5d7cc",
    storageBucket: "node-firebase-rest-api-5d7cc.appspot.com",
    messagingSenderId: "475920983694",
    appId: "1:475920983694:web:f5c5a9762bf3de89cd4bdf",
    measurementId: "G-0Y252RSSXR"
};

// Inicializando o Firebase
firebase.initializeApp(firebaseConfig);

// Inicializando o Express
const app = express();

// Definindo a utilização de JSON no corpo da requisição
// (Body Parser)
app.use(express.json());

// Definindo a utilização do CORS
// (frontend)
app.use(cors());

// Definindo o tipo de banco de dados
const db = firebase.firestore();

// Definindo a coleção do banco de dados
const User =  db.collection('users');

// Definindo as rotas para o CRUD (sem definição recursos!!!)

// RECUPERANDO TODOS OS DOCUMENTOS DA COLEÇÃO
app.get("/", async (req, res) => {
    // a constante snapshot irá receber o resultado da busca na coleção "Users"
    const snapshot = await User.get();
    console.log(snapshot);

    // criando o objeto que irá receber o JSON com os documentos do banco
    const users = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }));

    console.log(users);

    // enviando para o usuário a resposta da requisição
    res.send(users)
});

// RECUPERANDO UM DOCUMENTO ESPECÍFICO DA COLEÇÃO
app.get("/:id", async (req, res) => {
    // criando uma constante para receber o parametro ID que está vindo da requisição
    const id = req.params.id;

    // a constante snapshot irá receber o resultado da busca na coleção "Users"
    const snapshot = await User.get();

    // criando o objeto que irá receber o JSON com os documentos do banco
    const users = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }));

    // filtrando dentro do retorno do banco para encontrar o documento com o id enviado por parametro
    const user = users.filter((u) => {
        return u.id == id;
    });

    // enviando a resposta da requisição
    res.send(user);
})

// SALVANDO UM DOCUMENTO NA COLEÇÃO
app.post('/', async (req, res) => {
    // armazenando o corpo da requisição em um objeto
    const data = req.body;
    console.log(data);

    // inserindo o objeto 'data' na coleção
    await User.add(data);

    // enviando uma resposta para a requisição
    res.status(201).send({
        msg: 'Usuário salvo!'
    });

// ATUALIZANDO UM DOCUMENTO NA COLEÇÃO
app.put("/:id", async (req, res) => {
    const id = req.params.id;
    await User.doc(id).update(req.body);
    res.send({
        msg: "Usuário alterado!"
    })
});

// EXCLUINDO UM DOCUMENTO NA COLEÇÃO
app.delete('/:id', async (req, res) => {
    const id = req.params.id;
    await User.doc(id).delete();
    res.send({
        msg: "Usuário excluido!"
    })
})

// Criando uma rota para teste
// app.get("/", (req, res, next) => {
//     // enviando uma resposta para a requisição
//     res.status(200).send({
//         msg: 'Hello world!',
//         teste: req.body
//     })
// });

// Definindo a porta onde o servidor estará ouvindo
app.listen(3000, () => {
    console.log('API rodando em http://localhost:3000')
});
*/