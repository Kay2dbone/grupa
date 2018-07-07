'use strict'

const Schema = use('Schema')

class MediafilesSchema extends Schema {
  up () {
    this.create('mediafiles', (table) => {
      table.increments('mediaid')
      table.integer('projectid', 8)
      table.integer('sendertype', 2)  //0 for groupa, 1 for clients, 2 for developer
      table.integer('receivertype', 2)
      table.integer('senderid', 8)
      table.integer('receiverid', 8)
      table.string('filetype', 30)  //Image, animation, video, ...
      table.string('filename', 300)
      table.string('directorystored', 30)
      table.timestamps('datecreated')
    })
  }

  down () {
    this.drop('mediafiles')
  }
}

module.exports = MediafilesSchema
