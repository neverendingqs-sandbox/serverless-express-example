module.exports.env = () => {
  return {
    SESSION_SECRET: process.env.SESSION_SECRET,
    PCO_CLIENT_ID: process.env.PCO_CLIENT_ID,
    PCO_CLIENT_SECRET: process.env.PCO_CLIENT_SECRET
  };
};
