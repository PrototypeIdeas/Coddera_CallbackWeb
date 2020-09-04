var purecloudModel = require('../models/PureCloudCallback')

module.exports = function (application) {
    application.get('/coddera-callback-widget', function (req, res) {

        res.render("widgets/coddera-callback-widget");

    });

    application.post('/coddera-callback-widget/create', function (req, res) {
        var params = req.body;
        console.log("Parametros: " + JSON.stringify(params));

        req.assert('name', 'Parametro {name} é obrigatório').notEmpty();
        req.assert('phone', 'Parametro {phone} é obrigatório').notEmpty();

        var error = req.validationErrors();

        if(error){
            res.status(400).json(error);
        }

        purecloudModel.createCallback(req, res);
    });
};