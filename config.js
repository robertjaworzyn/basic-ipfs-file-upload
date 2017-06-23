const env = process.env;

const nodeEnv = env.NODE_ENV || 'development';

module.exports = nodeEnv;

module.exports = {
  port: env.PORT || 1234,
  host: env.HOST || '0.0.0.0'
};
