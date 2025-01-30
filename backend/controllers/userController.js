import asyncHandler from "express-async-handler";
import User from "../db/models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//@desc Register user
//@route POST /api/user/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10); //Hash password

  const user = await User.create({
    username,
    password: hashedPassword,
  });

  res.status(201).json({ message: "User successfully created" });
});

//@desc Login user
//@route POST /api/user/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.statusCode = 400;
    throw new Error("All field are mandatory");
  }

  const user = await User.findOne({ username });

  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          id: user._id,
          username: user.username,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30m" }
    );

    res.status(201).json({ accessToken });
  } else {
    res.statusCode = 401;
    throw new Error("Email or password is not valid");
  }
});

//@desc Current user
//@route GET /api/user/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

export { registerUser, loginUser, currentUser };
