/* eslint-disable no-undef */
'use strict'

const Model = use('Model')

const Hash = use('Hash')

class User extends Model {
  static boot () {
    super.boot()

    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  addresses() {
    return this.hasMany('App/Models/UserAddress')
  }

  tokens () {
    return this.hasMany('App/Models/Token')
  }

  tuition() {
    return this.hasMany('App/Models/Tuition')
  }
}

module.exports = User
