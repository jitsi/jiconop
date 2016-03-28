Jitsi Connection Optimization
============
A server side component node.js application that listens for http requests, creates bosh connection on every request and returns rid, sid and jid in the response. That way the client can receive the connection details with a single AJAX request. Than the client can call Strophe.attach with the received rid, sid and jid and start using that connection. This mechanism can speed up the connecting process.

## Installation
TBD

## Building the sources
```
npm install
```

## Running
```
node index.js
```
