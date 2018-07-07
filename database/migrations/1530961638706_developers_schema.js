'use strict'

const Schema = use('Schema')

class DevelopersSchema extends Schema {
  up () {
    this.create('developers', (table) => {
      table.increments('developerid')
      table.string('email', 200).notNullable().unique()
      table.string('firstname', 20)
      table.string('lastname', 20)
      table.string('country', 40)
      table.string('domicilestate', 40).defaultTo('')
      table.string('address', 50).defaultTo('')
      table.string('bankname', 70).defaultTo('')
      table.string('accountnumber', 15).defaultTo('')
      table.string('acountname', 10).defaultTo('')
      table.integer('emailverificationstatus', 1).defaultTo(0)
      table.string('phonenumber', 17)     
      table.string('specialization', 40)
      table.integer('teamid', 7).unsigned().references('teamid').inTable('teams')
      table.string('teamrole', 35)
      table.integer('teamlead', 1).defaultTo(0)
      table.integer('teamleadid', 8).defaultTo(0)
      table.integer('activationlevel', 1).defaultTo(0)
      table.string('resetpasswordtoken', 200)
      table.datetime('resetpassworddate')
      table.string('password', 400)
      table.string('regtoken', 300).unique().index()
      table.string('accesstoken', 700).notNullable().unique().index()
      table.timestamps('datecreated')
    })
  }

  down () {
    this.drop('developers')
  }
}

module.exports = DevelopersSchema
