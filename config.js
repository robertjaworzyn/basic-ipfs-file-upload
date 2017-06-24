const env = process.env;

export const nodeEnv = env.NODE_ENV || 'development';

export default {
  mongodbUri: 'mongodb://localhost:27017/test',
  port: env.PORT || 1234,
  host: env.HOST || '0.0.0.0'
};
