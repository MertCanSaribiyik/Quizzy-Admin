const validateRegister = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.statusCode = 400;
    throw new Error("All fields are mandatory");
  }

  if (password.length < 8) {
    res.statusCode = 400;
    throw new Error("Password must be at least 8 characters long");
  }

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)/;

  if (!passwordRegex.test(password)) {
    res.statusCode = 400;
    throw new Error("Password must include at least one letter and one number");
  }

  next();
};

export default validateRegister;
