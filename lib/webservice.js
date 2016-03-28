var http = require('http');
var XMPPUtils = require("./XMPPUtils");
var Utils = require("./Utils");

/**
 * Starts web server. On every request tries to create XMPP connection and puts
 * in the response - rid and sid from the bosh session and the jid from the
 * XMPP connection.
 * @param config {object} - boshUrl, XMPPDomain, port
 */
module.exports = function(config) {
    http.createServer(function (req, res) {
        var params = Utils.getQueryParams(req.url);
        XMPPUtils.createConnection(params, config).then(
        function (connectionInfo) {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(connectionInfo));
        }).catch(function (error) {
            console.log("Error occured! " + error);
            res.writeHead(500, "Internal Server Error");
            res.end();
        });
    }).listen(config.port);
}
