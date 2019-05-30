# karma-events

> Karma Framework to execute tasks on Karma Events.

## Installation

Install `karma-events` via `npm`:

```shell
$ npm install karma-events --save-dev
```

## How it works
Karma server sends out runtime, custom events during the lifetime of the run. Using this plugin you can trigger custom actions for the events.

For example, you can start the test server before the tests begin executing on the browser and shut it down after the test completes.

## Configuration
1. **karma-events** module is automatically loaded from `node_modules`. You can also add it explicitly via the [plugins](http://karma-runner.github.io/4.0/config/plugins.html) configuration section.

```JS
plugins: [
  'karma-events'
]
```
2. Include `"events"` in the list of `frameworks`.
3. Define actions for custom events under `events` section.

Sample configuration...
```js
// karma.conf.js
module.exports = function(config) {
  config.set({
    frameworks: ['browserify', 'mocha', 'events'],
    files: [
      '*.js'
    ],
    events: {
      events: {
        run_start:    'npm run start-test-server',
        run_complete: 'npm run stop-test-server'
      }
    }
  });
};
```

The external command specified for the event will be executed upon receving the event from the karma server.

You do not have to run an external command, instead, you could specify a custom handler function.

```js
events: {
  data: {
    port: 8080
  },
  events: {
    run_start: function (browsers, logger) {
      logger.info(`run_start: Starting server.`);
      this.data.service = server.listen(this.data.port);
    },
    run_complete: function (browsers, results, logger) {
      logger.info(`run_complete: Stopping server.`);
      if (this.data.service) {
        service.close();
      }
    }
  }
},
```

The function is called with `events` configuration context (as `this`) and the arguments of the event.
Additionally, the `logger` object is also passed as the last parameter.

Please refer to [Karma API](http://karma-runner.github.io/4.0/dev/public-api.html) on specific Karma server events and corresponding arguments.

#### Notes:
1. An arrow style function is discouraged here, as it does not bind to `this` context. 

2. Use `data` to define, store and update state information.

## License

karma-events is [MIT licensed](./LICENSE).