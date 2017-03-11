module.exports = {
  getHostUri: (req) => {
    const protocol = req.headers['x-forwarded-proto'] || req.protocol;
    return protocol + '://' + req.headers.host;
  }
};
