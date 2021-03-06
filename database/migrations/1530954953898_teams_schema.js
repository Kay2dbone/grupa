'use strict'

const Schema = use('Schema')

class TeamsSchema extends Schema {
  up () {
    this.create('teams', (table) => {
    table.increments('teamid')
    table.string('email', 200).unique()
    table.string('teamname', 700)
    table.string('username', 20).unique()
    table.string('country', 40)
    table.string('domicilestate', 40)
    table.string('address', 50)
    table.string('bankname', 70)
    table.string('accountnumber', 15)
    table.string('acountname', 10)
    table.integer('incorporated', 1).defaultTo(0)
    table.string('bondduration', 2) //in years
    table.integer('emailverificationstatus', 1).defaultTo(0)
    table.string('phonenumber', 17)     
    table.string('specialization', 40)
    table.integer('vettingstatus', 2).defaultTo(0)
    table.integer('activationlevel', 1).defaultTo(null)
    table.integer('teamleadid', 10).defaultTo(null)
    table.string('regtoken', 400)
    table.string('accounttype', 30).defaultTo('')
    table.timestamps('datecreated')

    })
  }

  down () {
    this.drop('teams')
  }
}

module.exports = TeamsSchema
