const { exec } = require('child_process');

const KarmaEvents = function (emitter, loggerCreate, config) {
  const logger = loggerCreate('KarmaEvents');

  Object.entries(config.events).forEach(([msg, cmd]) => emitter.on(msg, (...args) => {
      if (typeof cmd === 'function') {
        cmd.call(config, ...args, logger);
      }
      else {
        logger.info(`${msg}: \`${cmd}\``);
        exec(cmd);
      }
    })
  );
};

KarmaEvents.$inject = ['emitter', 'logger.create', 'config.events'];

module.exports = {
  'framework:events': ['factory', KarmaEvents]
};