'use strict'

const Schema = use('Schema')

class ProjectsSchema extends Schema {
  up () {
    this.create('projects', (table) => {
      table.increments('projectid')
      table.integer('clientid', 6).unsigned().references('clientid').inTable('clients')
      table.string('projectname', 200).unique()
      table.string('timeline', 60)
      table.string('budget', 40)
      table.string('overview', 300)
      table.string('similarprojects', 200)
      table.datetime('activationdate')
      table.string('paymentstatus', 25)
      table.integer('teamid', 6).unsigned().references('teamid').inTable('teams')
      table.integer('deliverystatus', 1).defaultTo(0)
      table.timestamps('datecreated')

    })
  }

  down () {
    this.drop('projects')
  }
}

module.exports = ProjectsSchema
