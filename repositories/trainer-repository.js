'use strict'

const firebase = require('../db')
const firestore = firebase.firestore()
const Trainer = require ('../models/trainer')

class trainerRepository {

    constructor () {}

    async create(data) {
        return await firestore.collection('trainers').doc().set(data)
    }

    async update(id, data) {
        return await firestore.collection('trainers').doc(id).update(data)
    }

    async getAll () {
        return await firestore.collection('trainers').get()
    }

    async getById (id) {
        return await firestore.collection('trainers').doc(id).get()
    }

    async delete (id) {
        return await firestore.collection('trainers').doc(id).delete()
    }

}

module.exports = trainerRepository