// Middleware that spits out requests in three colors to indicate different types
const clog = (req, res, next) => {
  const fgCyan = '\x1b[36m';
  const green = "\x1b[32m";
  const magenta = "\x1b[35m";
  switch (req.method) {
    case 'GET': {
      console.info(`📗 ${green}${req.method} request to ${req.path}`);
      break;
    }
    case 'POST': {
      console.info(`📘 ${fgCyan}${req.method} request to ${req.path}`);
      break;
    }
    default:
      console.log(`📕 ${magenta}${req.method} request to ${req.path}`);
  }

  next();
};

exports.clog = clog;
