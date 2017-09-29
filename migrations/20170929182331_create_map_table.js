exports.up = function(knex, Promise) {
  return knex.schema.createTable('maps', function(t) {
        t.increments('mapid').unsigned().primary();
        t.string('mapname').nullable;
        t.integer('userid').nullable;
  });
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('maps');
};