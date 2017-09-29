const express  = require('express');
const app   = express();
const pg  = require('pg');
const settings = require('../../settings')

const knex =   require('knex')({
    client: 'pg',
    version: '7.2',
    debug:true,
    connection: {
      host: settings.host,
      user     : settings.user,
      password : settings.password,
      database : settings.database,
    }
  });


knex.schema.createTable('maps', function (table) {
  table.increments();
  table.integer('userid');
  table.string('mapname');
});

knex.destroy();

