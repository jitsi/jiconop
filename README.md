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

## Deployment
```
sudo su
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
apt-get install -y nodejs
wget -qO - https://download.jitsi.org/jitsi-key.gpg.key | sudo apt-key add -
echo 'deb https://download.jitsi.org stable/' > /etc/apt/sources.list.d/jitsi.list
apt-get update
apt-get install jiconop
service jiconop start
```

Make sure you meet the following steps: 
- you do not have /etc/nginx/sites-enabled/default (delete it)
- nginx config:
```
#server {
#    listen 80;
#    server_name <your-domain>;
#    return 301 https://$host$request_uri;
#}
server {
    listen 443 ssl default_server;
    listen 80 default_server;
    #server_name <your-domain>;
........
.....
    # BOSH
    location /http-bind {
        proxy_pass      http://localhost:5280/http-bind;
        proxy_set_header X-Forwarded-For $remote_addr;
        proxy_set_header Host beta.meet.jit.si;
    }
}
```
- config.js add property externalConnectUrl:"//<your-domain>/http-pre-bind"
