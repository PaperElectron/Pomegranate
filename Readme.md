<img align="left" style="padding:10px" src="./Pomegranate_icon.png" >
# Pomegranate 3.0.0-0 Beta

#### A wildly flexible application framework.

***
[![NPM Version][npm-image]][npm-url]
[![Linux][travis-image]][travis-url]
***

# Whats it do?

Pomegranate is a graybox, Inversion of Control based application framework. It ingests simple plugins, orders them and runs the hooks they expose. With it you can build applications in just a few lines of code, or highly complex systems designed to scale.

### So, how's it going to make my life easier?

A modern web backend, REST Api, or microservice doesn't live in it's own tidy little box just waiting for connections. The need to talk to, and interface with SQL Databases, Redis, S3 buckets and mail services among others, presents one of the greatest challenges in an Asynchronous programming enviornment. Pomegranate steps in and provides a discrete, layer based hook interface for managing the entire lifecycle of your code, without events or callback/promise hell.

### Write the code you are already writing today.

Pomegranate plugins are simple structures that make it easy to separate concerns and write unit tests. You can export one plugin from a
module, and provide a very specific functionality, or you can export an array of them and build and entire application. *Simple plugins are the building blocks to complex applications.*

# Install

The commands below will install Pomegranate and the example plugin stack, as well as create the necessary configuration files and plugin work
directories.

```shell
$ npm init
$ npm install --save pomegranate pomegranate-example-plugin
$ node_modules/.bin/pomegranate init .
```

# Run
You can exclude the `node_modules/.bin` part if you have it on your $PATH, or have Pomegranate installed globally.

```shell
$ node_modules/.bin/pomegranate start
```

# Develop

Writing Plugins is easy and intuitive. If we wanted to wrap the Node http server in a plugin we could do something like this.
In just 26 lines of code we can abstract the entire lifecycle of creating, starting and stopping an http server,
with the added benefit of user overridable default configs. If you need access to other plugins, simply pass a function with parameter names
matching the dependencies you need and they will be available to you inside.

```javascript
module.exports = {
  options: {host: 'localhost', port: 8080},
  metadata: {name: 'HTTP', type: 'none', layer: 'server'},
  plugin: {
    load: function(inject, loaded){
    
      // Router here assumes another plugin that provides your routing stack.
      inject(function(Router){
        this.server = require('http').createServer(Router)
        loaded(null, null)
      }, this)

     /*
      * This will work just as well.
      *
      * var Router = inject(function(Router){ return Router })
      * this.server = require('http').createServer(Router)
      * loaded(null, null)
      */
    
    },
    start: function(done){
      this.server.listen(this.options.port, this.options.host, function(err){
        if(err) return done(err)
        return done()
      })
    },
    stop: function(done){
      this.server.close(function(err){
        if(err) return done(err)
        return done()
      })
    }
  }
}

```

Pomegranate plugins each expose a singular configuration object that both act as default settings, as well as user configurable options.
As you are adding or writing plugins, it is helpful to have a way to generate these so you don't forget anything. Lucky for us there is
simple command to do just that.

```shell
$ pomegranate build
```

You can checkout detailed documentation about Pomegranate, Plugins, and the underlying modules that support it here:

* [Pomegranate Docs]()
* [Plugin Authoring](https://github.com/Pomegranate/pomegranate-example-plugin)

[doc-url]: http://pomegranate.paperelectron.com
[npm-image]: https://img.shields.io/npm/v/pomegranate.svg
[npm-url]: https://www.npmjs.com/package/pomegranate
[travis-image]: https://img.shields.io/travis/PaperElectron/Pomegranate/master.svg
[travis-url]: https://travis-ci.org/PaperElectron/Pomegranate
