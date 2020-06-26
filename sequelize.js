const Sequelize = require('sequelize');
const NewsletterModel = require('./models/NewslettersModel');
const SettingModel = require('./models/SettingModel');
const UsersModel = require('./models/UsersModel');
const DiagnosticModel = require('./models/DiagnosticModel');
const TagModel = require('./models/TagsModel');
const CommentModel = require('./models/CommentModel');
const LikeUserModel = require('./models/LikeUserModel');
const FavorisModel = require('./models/FavorisModel');
const PublicationModel = require('./models/PublicationModel');
const SignaledModel = require('./models/SignaledModel');
const UserTagModel = require('./models/UserTagModel');
const PublicationTagModel = require('./models/PublicationTagModel');
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
 const LikeUser = LikeUserModel(sequelize, Sequelize);
 const Favoris = FavorisModel(sequelize, Sequelize);
 const Publication = PublicationModel(sequelize, Sequelize);
 const Comment = CommentModel(sequelize, Sequelize);
 const Signaled = SignaledModel(sequelize, Sequelize);
 const UserTag = UserTagModel(sequelize, Sequelize);
 const PublicationTag = PublicationTagModel(sequelize, Sequelize);

// Relationship
User.belongsTo(Setting);
Setting.hasOne(User);

User.belongsTo(Diagnostic);
Diagnostic.hasOne(User);

LikeUser.belongsTo(User);
User.hasMany(LikeUser);

LikeUser.belongsTo(Publication);
Publication.hasMany(LikeUser);

Favoris.belongsTo(User);
User.hasMany(Favoris);

Favoris.belongsTo(Publication);
Publication.hasMany(Favoris);

Publication.belongsTo(User);
User.hasMany(Publication);

Comment.belongsTo(User);
User.hasMany(Comment);

Comment.belongsTo(Publication);
Publication.hasMany(Comment);

Signaled.belongsTo(User);
User.hasOne(Signaled);

Signaled.belongsTo(Comment);
Comment.hasOne(Signaled);

Signaled.belongsTo(Publication);
Publication.hasOne(Signaled);

Signaled.belongsTo(Publication);
Publication.hasOne(Signaled);

UserTag.belongsTo(User);
User.hasMany(UserTag);

UserTag.belongsTo(Tag);
Tag.hasMany(UserTag);

PublicationTag.belongsTo(Publication);
Publication.hasMany(PublicationTag);

PublicationTag.belongsTo(Tag);
Tag.hasMany(PublicationTag);

// synchro with db
sequelize.sync({ force: false})
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
    Comment: Comment,
    Favoris: Favoris
};


