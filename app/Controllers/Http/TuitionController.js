/* eslint-disable no-undef */
'use strict'

const Tuition = use('App/Models/Tuition')


class TuitionController {

  async index ({ response, auth}) {
    if(auth.user.user_type != 1) return response.status(401).send({message: 'Voce nao tem autorização'})

    const tuition = await Tuition.all()

    return response.status(200).send(tuition)

  }

  async store ({ request, response, auth }) {

    if(auth.user.user_type != 1) return response.status(401).send({message: 'Voce nao tem autorização'})

    const data = request.only([
      'user_id',
      'due_date'
    ])

    try {
      const tuition = await Tuition.create(data)
      
      return response
        .status(200)
        .send({
          message: 'Mensalidade gerada com sucesso',
          due_date: `vencimento para: ${tuition.due_date}`
        })  
    } catch (error) {
      return response
      .status(500)
      .send({
        message: 'Algo de errado aconteceu'
      })  
    }
  }

  async show ({ params, request, response, view }) {
  }

  async edit ({ params, request, response, view }) {
  }

  async update ({ params, auth, response }) {
    if(auth.user.user_type != 1) return response.status(401).send({message: 'Voce nao tem autorização'})

    try {
      const tuition = await Tuition.findOrFail(params.id)

      tuition.merge({ pay: 1 })

      await tuition.save()

      console.log(tuition)

      return response.status(200).send({message: 'Mesalidade paga com sucesso'})

    } catch (error) {
      return response.status(500).send({message: 'Algo de errado aconteceu'})

    }
  }

  async destroy ({ params, response, auth }) {
    if(auth.user.user_type != 1) return response.status(401).send({message: 'Voce nao tem autorização'})

    try {

      const tuition = await Tuition.findOrFail(params.id)

      await tuition.delete()

      return response.status(200).send({message: 'Mensalidade excluida com sucesso'})


    } catch (error) {
      return response.status(500).send({message: 'Algo de errado aconteceu'})

    }
  }
}

module.exports = TuitionController
