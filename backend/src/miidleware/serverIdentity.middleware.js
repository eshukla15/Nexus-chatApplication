const getServerName = () => process.env.App_name || process.env.APP_NAME || "backend-local";

export const identifyServer = (req, res, next) => {
  const serverName = getServerName();

  req.serverName = serverName;
  res.setHeader("X-Backend-Server", serverName);
  res.setHeader("X-Server-Name", serverName);

  console.log(`[${serverName}] ${req.method} ${req.originalUrl}`);

  res.on("finish", () => {
    console.log(`[${serverName}] ${req.method} ${req.originalUrl} -> ${res.statusCode}`);
  });

  next();
};
