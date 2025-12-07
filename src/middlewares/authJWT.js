import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ message: "Acceso denegado" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token invalido o expirado" });
  }
};

export const checkAdmin = (req, res, next) => {
  if (req.user && req.user.rol === "admin") {
    next();
  } else {
    res
      .status(403)
      .json({
        message: "Acceso denegado, se necesitan permisos de Administrador",
      });
  }
};
