
exports.up = function(knex, Promise) {
    return knex.schema
    .createTable('projects', function(table){
        table.increments('id').primary();
        table.string('pick');
        table.string('title');
        table.string('date');
        table.text('text');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema
    .dropTableIfExists('projects');
};
