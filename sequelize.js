const Sequelize = require('sequelize');
const NewsletterModel = require('./models/NewslettersModel');
const SettingModel = require('./models/SettingModel');
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



// Relationship example
/*Blog.belongsToMany(Tag, { through: BlogTag, unique: false })
Tag.belongsToMany(Blog, { through: BlogTag, unique: false })
Blog.belongsTo(User);*/

// synchro with db
sequelize.sync({ force: false})
    .then(() => {
        console.log(`Database & tables created!`)
    });

module.exports = {
    Newsletters: Newsletters,
    Setting: Setting,

};


