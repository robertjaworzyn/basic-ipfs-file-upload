const env = process.env;

export const nodeEnv = env.NODE_ENV || 'development';

export default {
  port: env.PORT || 1234,
  host: env.HOST || '0.0.0.0'
};
