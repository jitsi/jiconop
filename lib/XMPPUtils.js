var XMPP = require('node-xmpp-client');

/**
 * Array with the query params from the request that we are going to pass when
 * creating the connection.
 */
var BOSH_QUERY_PARAMS = ["token", "room"];

/**
 * Adds to the given bosh url query parameters that match the names and the
 * prefix from BOSH_QUERY_PARAMS
 * @param bosh the bosh url
 * @param queryParams map with query params that are going to be filtered.
 * @returns the new bosh url
 */
function generateBoshURLWithParams(bosh, queryParams) {
    var boshUrl = bosh;
    for(var key in queryParams) {
        if(!key.length || BOSH_QUERY_PARAMS.indexOf(key) === -1)
            continue;

        boshUrl += (boshUrl.indexOf('?') === -1 ? '?' : '&') + key + "=" +
            queryParams[key];
    }
    return boshUrl;
};

/**
 * Creates xmpp connection and extracts from it rid and sid from the bosh
 * session and jid from the xmpp connection. Returns Promise that is resolved
 * when the connection is done with the extracted information.
 * @param queryParams {object} map with query params that are going to be
 * filtered and passed to the bosh url.
 * @param config {object} - boshUrl, XMPPDomain, port
 */
function createXMPPConnection(queryParams, config) {
    var bosh = generateBoshURLWithParams(config.boshUrl, queryParams);
    console.log(bosh)
    return new Promise(function(resolve, reject)
    {
        var connectionInfo = {};
        var prebind = new XMPP({
            jid: "@" + config.XMPPDomain,
            preferred: "ANONYMOUS",
            bosh: {
                url: bosh,
                wait: '60',
                prebind: function(error, data) {
                    if (error){
                        console.log(error);
                        reject(error);
                        return;
                    }
                    connectionInfo = data;
                    prebind.connect();
                }
            }
        });
        prebind.on('online', function() {
            var jid = prebind.jid;
            connectionInfo.jid = jid.local + "@" +
                jid.domain + "/" + jid.resource;
            resolve(connectionInfo);
        })
    });
}

module.exports = {
    createConnection: createXMPPConnection
}
