/* eslint-disable no-undef */
'use strict'

const Database = use('Database')
const User = use('App/Models/User')

class UserController {

    user_type (type){
        return type == 1 ? 'Administrador' : 'Associado'
    }

    async index ({ response, auth }) {
        if(auth.user.user_type != 1) return response.status(401).send({message: 'Voce nao tem autorização'})

        const users = await User.all()
        return response.send({ users })
    }

    async store({ request, auth, response }){ 
        if(auth.user.user_type != 1) return response.status(401).send({message: 'Voce nao tem autorização'})

        const data = request.only([
            'username', 
            'email', 
            'password', 
            'ddd', 
            'phone', 
            'user_type'
        ])

        const addresses = request.input('addresses')

        const trx = await Database.beginTransaction()

        const user = await User.create(data, trx)

        await user.addresses().createMany(addresses, trx)

        await trx.commit()

        return user

    }

    async show({ params, auth, response }) {
        if(auth.user.user_type != 1) return response.status(401).send({message: 'Voce nao tem autorização'})
        
        try {

            const user = await User.findOrFail(params.id)  
            user.user_type =  this.user_type(user.user_type)
            
            await user.load('tuition')
            
            return user

        } catch (error) {
            return response.status(200).send({message: 'Nenhum usuario encontrado'})        
        }
    }




}

module.exports = UserController
