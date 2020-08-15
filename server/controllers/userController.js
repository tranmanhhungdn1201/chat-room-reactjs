const User = require("../models/User");
const { signToken } = require("../middlewares/serverAuth");
const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.register = async (req, res) => {
    const { name, email } = req.body;
    if (req.body.password.length < 6) {
        return res.status(400).json({
            success: false,
            message: "Password must be at least 6 characters long.",
        })
    }

    const isExistEmail = await User.findOne({email: email});
    console.log(isExistEmail);
    if (isExistEmail) {
        return res.status(400).json({
            success: false,
            message: "Email is exist.",
        })
    }

    const password =  await bcrypt.hash(req.body.password, saltRounds);
    const user = new User({ name, email, password });
    await user.save();
    const token = signToken(user);

    return res.json({
        success: true,
        token,
        message: "User registered successfully",
    })
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
        // deny access
        return res.status(400).json({
            success: false,
            message: "Email or password is wrong."
        });
    }
    if(!bcrypt.compareSync(password, user.password)) {
        // Passwords don't match
        return res.status(400).json({
            success: false,
            message: "Email or password is wrong."
        });
    }
    const token = signToken(user);

    return res.json({
        success: true,
        token,
        message: "Login successfully."
    });

};