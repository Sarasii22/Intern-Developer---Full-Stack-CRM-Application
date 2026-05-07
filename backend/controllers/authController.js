const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    if (email === "admin@example.com" && password === "password123") {
      const token = jwt.sign(
        { email },
        process.env.JWT_SECRET || "defaultsecret",
        { expiresIn: "1d" }
      );

      return res.json({
        token,
        user: { email },
      });
    }

    res.status(401).json({ message: "Invalid credentials" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { login };