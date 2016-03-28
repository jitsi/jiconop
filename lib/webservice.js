var http = require('http');
var XMPPUtils = require("./XMPPUtils");
var Utils = require("./Utils");
var config = require("../config.json");

/**
 * Starts web server. On every request tries to create XMPP connection and puts
 * in the response - rid and sid from the bosh session and the jid from the
 * XMPP connection.
 */
module.exports = function() {
    http.createServer(function (req, res) {
        var params = Utils.getQueryParams(req.url);
        XMPPUtils.createConnection(params).then(function (connectionInfo) {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(connectionInfo));
        }).catch(function (error) {
            console.log("Error occured! " + error);
            res.writeHead(500, "Internal Server Error");
            res.end();
        });
    }).listen(config.port);
}
