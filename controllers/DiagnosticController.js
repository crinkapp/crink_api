const  { Diagnostic } = require('../sequelize');

async function getDiagnostic(req, res) {
    try {
        const diagnostic =  await Diagnostic.findAll({raw: true});
        return res.json(diagnostic);
    }
    catch(err) {
        return res.json(err);
    }
}

async function addDiagnostic(req, res) {

    const locks= req.body.locks_diagnostic;
    const hair_texture= req.body.hair_texture_diagnostic;
    const porosity= req.body.porosity_diagnostic;
    const density= req.body.density_diagnostic;
    const thickness= req.body.thickness_diagnostic;
    const curl_pattern= req.body.curl_pattern_diagnostic;
    const distance_between_curls= req.body.distance_between_curls_diagnostic;

    const diagnostic = new Diagnostic({
        locks_diagnostic: locks,
        hair_texture_diagnostic: hair_texture,
        porosity_diagnostic: porosity,
        density_diagnostic: density,
        thickness_diagnostic: thickness,
        curl_pattern_diagnostic: curl_pattern,
        distance_between_curls_diagnostic: distance_between_curls

    });

    diagnostic
        .save()
        .then(data => {
            return res.json(data);
        })
        .catch(err => {
            return res.json({message: err});
        })
}

module.exports = {
    addDiagnostic,
    getDiagnostic
};