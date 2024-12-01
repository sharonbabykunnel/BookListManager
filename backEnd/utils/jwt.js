import JWT from "jsonwebtoken";

const accessToken = (uid) => {
  return JWT.sign({ uid },process.env.JWT_SECRET, { expiresIn: "30s" });
};

export default accessToken;
