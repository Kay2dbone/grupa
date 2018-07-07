'use strict'

const Schema = use('Schema')

class ClientsSchema extends Schema {
  up () {
    this.create('clients', (table) => {
      table.increments('clientid')
      table.string('email', 200).unique()
      table.string('name', 40)
      table.string('country', 40)
      table.string('projectname', 60)
      table.string('address', 50)
      table.string('phonenumber', 17)
      table.string('projectkind', 25)   //web,mobile, others
      table.integer('teamrole', 2).defaultTo(1)
      table.integer('activationlevel', 1)
      table.string('password', 400)
      table.string('accesstoken', 700).unique()
      table.string('resetpasswordtoken', 200)
      table.datetime('resetpassworddate')
      table.timestamps('datecreated')

    })
  }

  down () {
    this.drop('clients')
  }
}

module.exports = ClientsSchema
