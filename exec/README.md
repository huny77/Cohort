# build & deploy

## 1. Build

* backend

```
$ cd home/S05P31B104/backend

$ chmod +x gradlew

$ ./gradlew clean build
```

* frontend

```
$ cd home/S05P31B104/frontend

$ npm install -g yarn

$ yarn

$ yarn build
```
* deploy
```
$ cd home/S05P31B104

$ docker-compose down --rmi all

$ docker-compose up -d
```



## 2. SSL certificate
```
$ git clone https://github.com/letsencrypt/letsencrypt
$ cd letsencrypt
$ ./letsencrypt-auto --help
$ ./letsencrypt-auto certonly --standalone -d [YOUR_DOMAIN]
```
*  key directory
```
/etc/letsencrypt/live/[YOUR DOMAIN]/fullchain.pem
/etc/letsencrypt/live/[YOUR DOMAIN]/privkey.pem
```

## 3. Install Openvidu
```
$ cd /opt
$ curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_latest.sh | bash

```
* .env Configuration 
```
# OpenVidu configuration
# ----------------------

...
DOMAIN_OR_PUBLIC_IP=[YOUR DOMAIN]

OPENVIDU_SECRET=1234

CERTIFICATE_TYPE=letsencrypt

LETSENCRYPT_EMAIL=[YOUR EMAIL]
...

```

* customize deployed Nginx
```
$ sudo su
$ cd /opt/openvidu
$ docker-compose exec nginx cat /etc/nginx/conf.d/default.conf > custom-nginx.conf
$ docker-compose exec nginx cat /etc/nginx/nginx.conf > nginx.conf
```
* Add volumes
```
$ vi /opt/openvidu/docker-compose.yml


    nginx:
        ...
        volumes:
            ...
            - ./custom-nginx.conf:/custom-nginx/custom-nginx.conf
            - ./nginx.conf:/etc/nginx/nginx.conf

```
* custom-nginx.conf
```
# Your App
upstream yourapp {
    server localhost:5442;
}

upstream openviduserver {
    server localhost:5443;
}

server {
    listen 80;
    listen [::]:80;
    server_name k5b104.p.ssafy.io;
    
    # Redirect to https
    location / {
        rewrite ^(.*) https://k5b104.p.ssafy.io:443$1 permanent;
    }    

    # letsencrypt
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location /nginx_status {
        stub_status;
        allow 127.0.0.1;	#only allow requests from localhost
        deny all;		#deny all other hosts	
    }
}



server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name [YOUR_DOMAIN];

    # SSL Config
    ssl_certificate         /etc/letsencrypt/live/[YOUR_DOMAIN]/fullchain.pem;
    ssl_certificate_key     /etc/letsencrypt/live/[YOUR_DOMAIN]/privkey.pem;
    ssl_trusted_certificate /etc/letsencrypt/live/[YOUR_DOMAIN]/fullchain.pem;

    ssl_session_cache shared:SSL:50m;
    ssl_session_timeout 5m;
    ssl_stapling on;
    ssl_stapling_verify on;

    ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3;
    ssl_ciphers "ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-SHA384:ECDHE-RSA-AES128-SHA256:ECDHE-RSA-AES256-SHA:ECDHE-RSA-AES128-SHA:DHE-RSA-AES256-SHA256:DHE-RSA-AES128-SHA256:DHE-RSA-AES256-SHA:DHE-RSA-AES128-SHA:ECDHE-RSA-DES-CBC3-SHA:EDH-RSA-DES-CBC3-SHA:AES256-GCM-SHA384:AES128-GCM-SHA256:AES256-SHA256:AES128-SHA256:AES256-SHA:AES128-SHA:DES-CBC3-SHA:HIGH:!aNULL:!eNULL:!EXPORT:!DES:!MD5:!PSK:!RC4";

    ssl_prefer_server_ciphers on;


    # Proxy
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Forwarded-Proto https;
    proxy_headers_hash_bucket_size 512;
    proxy_redirect off;

    # Websockets
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";

    # Your App
    location / {
	allow all;
        proxy_pass http://127.0.0.1:5000; 
    }
    # Springboot
    location /app {
        allow all;
        proxy_pass http://127.0.0.1:8080;
    }
    # node-server
    location /node {
        allow all;
        proxy_pass http://127.0.0.1:4000;
    }

    ########################
    # OpenVidu Locations   #
    ########################
    #################################
    # Common rules                  #
    #################################
    # Dashboard rule
    location /dashboard {
        allow all;
        deny all;
        proxy_pass http://openviduserver;
    }

    # Websocket rule
    location ~ /openvidu$ {
        proxy_pass http://openviduserver;
    }

    #################################
    # Deprecated API                #
    #################################
    # Openvidu Server
    location /layouts/custom {
        rewrite ^/layouts/custom/(.*)$ /custom-layout/$1 break;
        root /opt/openvidu;
    }

    location /recordings {
        proxy_pass http://openviduserver;
    }

    location /api {
        allow all;
        deny all;
        proxy_pass http://openviduserver;
    }

    location /info {
        allow all;
        deny all;
        proxy_pass http://openviduserver;
    }

    location /config {
        allow all;
        deny all;
        proxy_pass http://openviduserver;
    }

    location /accept-certificate {
        proxy_pass http://openviduserver;
    }

    location /cdr {
        allow all;
        deny all;
        proxy_pass http://openviduserver;
    }

    #################################
    # New API                       #
    #################################
    location /openvidu/layouts {
        rewrite ^/openvidu/layouts/(.*)$ /custom-layout/$1 break;
        root /opt/openvidu;
    }

    location /openvidu/recordings {
        proxy_pass http://openviduserver;
    }

    location /openvidu/api {
        allow all;
        deny all;
        proxy_pass http://openviduserver;
    }

    location /openvidu/info {
        allow all;
        deny all;
        proxy_pass http://openviduserver;
    }

    location /openvidu/accept-certificate {
        proxy_pass http://openviduserver;
    }

    location /openvidu/cdr {
        allow all;
        deny all;
        proxy_pass http://openviduserver;
    }

    #################################
    # LetsEncrypt                   #
    #################################
    location /.well-known/acme-challenge {
        root /var/www/certbot;
        try_files $uri $uri/ =404;
    }
}
```
* restart
```
$ cd /opt/openvidu
$ ./openvidu restart
```



## 5. API

- [cohort API](http://k5b104.p.ssafy.io:8080/swagger-ui/#)

- [openvidu API](https://docs.openvidu.io/en/stable/reference-docs/REST-API/)

