const checkOrigin = (req, res, next) => {
  const headerAuthorization = req.headers.authorization || "";
  const token = headerAuthorization.split(" ").pop();
  if (!token) {
    res.status(405).send({ error: "Unauthorized" });
  } else {
    next();
  }
};

module.exports = { checkOrigin };
