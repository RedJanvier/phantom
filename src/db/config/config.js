require('dotenv/config');

const { DATABASE_URL, TEST_DATABASE_URL, NODE_ENV } = process.env;

const env = NODE_ENV || 'development';
const common = {
  url: DATABASE_URL,
  dialect: 'postgres',
  logging: false,
};

const configs = {
  development: common,
  test: {
    ...common,
    url: TEST_DATABASE_URL,
  },
  production: { ...common },
};

module.exports = configs[env];
