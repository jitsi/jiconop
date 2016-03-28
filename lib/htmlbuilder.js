/**
 * NOTE: That file is not used currently.
 *
 * It's almost the same as webservice.js but in addition instead of returning
 * rid, sid and jid, it adds them to the index.html file and returns it.
 */
var http = require('http');
var fs = require('fs');
var config = require("../config.json");
var index = fs.readFileSync(config.indexHTMLLocation);
var XMPPUtils = require("./XMPPUtils");
var Utils = require("./Utils");

/**
 * Puts passed connectionInfo object in to the passed html.
 * @param html html string
 * @param connectionInfo {object}
 */
function addCredentialsToHML(html, connectionInfo) {
    return html.replace( "</body>","<script>window.XMPPAttachInfoStr = '" +
        JSON.stringify(connectionInfo) + "';</script></body>");
}

/**
 * Starts web server. On every request tries to create XMPP connection and
 * responds with the content of the index.html file with included information
 * about rid and sid from the bosh session and the jid from the
 * XMPP connection.
 */
module.exports = function() {
    http.createServer(function (req, res) {
        var params = Utils.getQueryParams(req.url);
        XMPPUtils.createConnection(params).then(function (connectionInfo) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(addCredentialsToHML(index.toString(), connectionInfo));
        }).catch(function (error) {
            console.log("Error occured! Fallback to original index.html "
                + error);
            res.writeHead(500, "Internal Server Error");
            res.end(index);
        });
    }).listen(config.port);
};
