

Install Nodejs using HomeBrew

    https://www.dyclassroom.com/howto-mac/how-to-install-nodejs-and-npm-on-mac-using-homebrew
    https://formulae.brew.sh/formula/node

Check Node and Npm versions

    node -v
    npm -v

Minimum node v13.6.0 and npm v6.13.4


Install vue.js

    https://vuejs.org/v2/guide/installation.html

    $ npm install vue

Unfortunately, my company laptop has MIM proxy because of which I get this error:
    $ npm install vue
    npm ERR! code UNABLE_TO_GET_ISSUER_CERT_LOCALLY
    npm ERR! errno UNABLE_TO_GET_ISSUER_CERT_LOCALLY
    npm ERR! request to https://registry.npmjs.org/vue failed, reason: unable to get local issuer certificate

Help:
Run following command to get rid of this error (this is unfortunate that this command needed to be run and make things unsecure)

    npm config set strict-ssl false


Start a new Nodejs project

    npm init


Install trading-vue

    npm intall trading-vue-js


Get the trading-vue-101 project:

    git clone https://github.com/C451/trading-vue-101.git
    cd trading-vue-101
    npm install


## Add bootstrap ##

*Note*: This did not work for me.

    npm i bootstrap jquery popper.js


Add to src/main.js: 

    import 'bootstrap'; 
    import 'bootstrap/dist/css/bootstrap.min.css';


## Add bootstrap-vue ##


    npm install bootstrap-vue bootstrap --save


## Add vuex

    npm install vuex --save
    

## Use Local trading-vue-js ##

Use local copy of trading-vue-js instead of the one in repo.

Do git clone and get both of these:

    git clone https://github.com/tvjsx/trading-vue-js
    git clone https://github.com/tvjsx/tvjs-overlays


then update package.json of your app project to this:

    "dependencies": {
        "bootstrap": "^4.4.1",
        "bootstrap-vue": "^2.11.0",
        "core-js": "^3.6.4",
        "trading-vue-js": "file:../trading-vue-js",
        "tvjs-overlays": "file:../tvjs-overlays",
        "vue": "^2.6.11",
        "vuex": "^3.1.3"
    },

And then 
    npm install


It should create symlinks in the 'dist' directory.

    $ ls -l node_modules/trading-vue-js  node_modules/tvjs-overlays
    lrwxr-xr-x 1 user 110051297 20 Apr  6 17:52 node_modules/trading-vue-js -> ../../trading-vue-js
    lrwxr-xr-x 1 user 110051297 19 Apr 16 10:52 node_modules/tvjs-overlays -> ../../tvjs-overlays



## Tutorials ##

    https://medium.com/swlh/how-to-use-async-and-await-with-vue-js-apps-33132aa0838b
    

## HTTP Client, Material UI

We need a HTTP client, a Material Design library for making our app look good, and the Vee-Validate library. 
To do this, run 

    npm i axios vee-validate vue-material 
    npm i axios --save
    
Axios is our HTTP client for communicating to back end. Vue Material is our Material Design library.
    


