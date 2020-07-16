/* eslint-disable no-undef */
'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TuitionSchema extends Schema {
  up () {
    this.create('tuitions', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.timestamp('due_date').notNullable()
      table.integer('pay').default(0)
      table.timestamps()
    })
  }

  down () {
    this.drop('tuitions')
  }
}

module.exports = TuitionSchema
