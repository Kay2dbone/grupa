'use strict'

const Schema = use('Schema')

class GrupatransactionsSchema extends Schema {
  up () {
    this.create('grupatransactions', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('grupatransactions')
  }
}

module.exports = GrupatransactionsSchema
