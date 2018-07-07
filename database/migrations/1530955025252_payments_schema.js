'use strict'

const Schema = use('Schema')

class PaymentsSchema extends Schema {
  up () {
    this.create('payments', (table) => {
      table.increments('paymentid')
      table.integer('projectid', 6).unsigned().references('projectid').inTable('projects')
      table.string('apiprovider', 40)
      table.string('transactionstatus', 30)
      table.string('paymentreference', 90) //(Initial deposit, MVP, Version 2, ...)
      table.string('currency', 20)
      table.string('amountpaid', 15)
      table.string('amountreceived', 15) /// less commision
      table.string('transactionid', 300)
      table.string('paymentstatus', 25)
      table.string('paymentgateway', 40)
      table.string('remark', 150)
      table.timestamps('paymentdate')

    })
  }

  down () {
    this.drop('payments')
  }
}

module.exports = PaymentsSchema
