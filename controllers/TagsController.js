const { Tag } = require('../sequelize');

async function addTag(req, res) {

    const name = req.body.name;
    const tag = new Tag({
        name_tag: name

    });

    tag
        .save()
        .then(data => {
            return res.json(data)
        })
        .catch(err => {
            return res.json({message: err})
        })
}

async function getTags(req, res) {
    try {
        const tags =  await Tag.findAll({raw: true});
        return res.json(tags);
    }
    catch(err) {
        return res.json(err)
    }
}
module.exports= {
    addTag,
    getTags,
};
