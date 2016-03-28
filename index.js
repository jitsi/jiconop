var webservice = require('./lib/webservice');

// Starts the webservice that will create the XMPP connection and will return
// rid, sid and jid in the http response.
webservice();
