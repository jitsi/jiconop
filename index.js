var webservice = require('./lib/webservice');

var argv = require('yargs')
    .usage('Usage: $0 [options]')
    .demand('b')
    .alias('b', 'bosh_url')
    .nargs('b', 1)
    .describe('b', 'Bosh url that is going to be used for creating new connections')
    .demand('x')
    .alias('x', 'xmpp_domain')
    .nargs('x', 1)
    .describe('x', 'XMPP Server domain that is going to be used for anonymous login')
    .alias('p', 'port')
    .nargs('p', 1)
    .number('n')
    .describe('p', 'The application will listen for http requests on this port. Default: 9615')
    .help('h')
    .alias('h', 'help')
    .example('$0 -b http://example.jitsi.net/http-bind/ -x example.jitsi.net')
    .argv;

config = {
    boshUrl: argv.bosh_url,
    XMPPDomain: argv.xmpp_domain,
    port: argv.port || 9615
}

// Starts the webservice that will create the XMPP connection and will return
// rid, sid and jid in the http response.
webservice(config);
