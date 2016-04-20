module.exports = function (app) {
    
    var items = [{
            name: "Ice Cream",
        }, {
            name: "Waffles",
        },{
            name: "Candy",
            purchased: true,
        }, {
            name: "Snarks"
        }];

    app.get('/api/items', function(req, res) {
        res.send(items);
    })
}
