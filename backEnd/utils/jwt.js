import JWT from "jsonwebtoken";

const accessToken = (uid) => {
  return JWT.sign({ uid },process.env.JWT_SECRET, { expiresIn: "5m" });
};

export default accessToken;
