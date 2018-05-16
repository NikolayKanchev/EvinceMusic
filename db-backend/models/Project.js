const Model = require('objection').Model;

class Project extends Model {
    static get tableName() {
        return 'projects';
    }

    static get jsonSchema() {
        return {
            type: 'object',

            properties: {
                id: {type: "string"},
                pick: {type: "string"},
                title: {type: "string"},
                date: {type: "string"},
                text: {type: "string"},
            }
        }        
    }
}

module.exports = Project;