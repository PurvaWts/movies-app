export const APP_CONFIG = () => {
  return {
    DBURI: process.env['DBURI'],
    PORT: process.env['PORT'],

    JWT_SECRET: process.env['JWT_SECRET'],
    JWT_EXPIRES: process.env['JWT_EXPIRES'],
  };
};
