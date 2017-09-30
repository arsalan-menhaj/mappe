exports.up = function(knex, Promise) {
  return knex.schema.table('maps', function(t) {
    t.string('Description');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('maps', function(t) {
    t.dropColumn('Description');
  });
};
