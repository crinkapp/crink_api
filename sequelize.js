const Sequelize = require('sequelize');
const NewsletterModel = require('./models/NewslettersModel');
const SettingModel = require('./models/SettingModel');
const UsersModel = require('./models/UsersModel');
const DiagnosticModel = require('./models/DiagnosticModel');
const TagModel = require('./models/TagsModel');
const CommentModel = require('./models/CommentModel');
const PublicationModel = require('./models/PublicationModel');
require('mysql2');
require('dotenv/config');

// CONNECT DATABASE WITH SEQUILIZE
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    define: {
        // The `timestamps` field specify whether or not the `createdAt` and `updatedAt` fields will be created.
        // This was true by default, but now is false by default
        timestamps: true
    }

});
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

// ------- Imports of Models ------ //
 const Newsletters = NewsletterModel(sequelize, Sequelize);
 const Setting = SettingModel(sequelize, Sequelize);
 const User = UsersModel(sequelize, Sequelize);
 const Diagnostic = DiagnosticModel(sequelize, Sequelize);
 const Tag = TagModel(sequelize, Sequelize);
 const Publication = PublicationModel(sequelize, Sequelize);
//  const Comment = CommentModel(sequelize, Sequelize);


// Relationship example

User.belongsTo(Setting);
Setting.hasOne(User);

User.belongsTo(Diagnostic);
Diagnostic.hasOne(User);

Publication.belongsTo(User);
User.hasMany(Publication);

// CommentModel.belongsTo(User); 
// CommentModel.belongsTo(Publication); 

// synchro with db
sequelize.sync({ force: true})
    .then(() => {
        console.log(`Database & tables created!`)
    });

module.exports = {
    Newsletters: Newsletters,
    Setting: Setting,
    User: User,
    Diagnostic: Diagnostic,
    Tag: Tag,
    Publication: Publication,
    // Comment: Comment,

};


