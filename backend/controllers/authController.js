const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password } = req.body;

  if (
    email === "admin@example.com" &&
    password === "password123"
  ) {
    const token = jwt.sign(
      { email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({
      token,
      user: { email },
    });
  }

  res.status(401).json({
    message: "Invalid credentials",
  });
};

module.exports = { login };