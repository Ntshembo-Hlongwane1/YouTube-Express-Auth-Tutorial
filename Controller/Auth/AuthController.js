import Bcrypt from "bcrypt";
import Formidable from "formidable";
import { userModel } from "../../Models/Users/users";

class AuthController {
  SignUp(request, response) {
    const form = new Formidable.IncomingForm();

    try {
      form.parse(request, async (error, fields, files) => {
        const { username, email, password, verifiedPassword } = fields;

        if (!username || !email || !password || !verifiedPassword) {
          return response
            .status(400)
            .json({ msg: "All fields have to be entered" });
        }

        if (password.length < 6) {
          return response
            .status(400)
            .json({ msg: "Password has to be at least 6 characters long" });
        }

        if (password !== verifiedPassword) {
          return response.status(400).json({ msg: "Passwords do not match" });
        }

        const isExistingUser = await userModel.findOne({
          username: username,
          email: email,
        });

        if (isExistingUser) {
          return response
            .status(400)
            .json({ msg: "User with this email and username already exists" });
        }

        const salt = await Bcrypt.genSalt(15);
        const hashedPassword = await Bcrypt.hash(password, salt);
        const newUser = new userModel({
          username,
          password: hashedPassword,
          email,
        });

        const savedUser = await newUser.save();

        return response.status(201).json(savedUser);
      });
    } catch (error) {
      console.log(error);
      return response
        .status(500)
        .json({ msg: "Server is currently down please try again later" });
    }
  }

  Login(request, response) {
    const form = new Formidable.IncomingForm();

    try {
      form.parse(request, async (error, fields, files) => {
        const { username, password } = fields;

        if (!username || !password) {
          return response
            .status(400)
            .json({ msg: "All fields have to be entered" });
        }

        const isExistingUser = await userModel.findOne({ username: username });

        if (!isExistingUser) {
          return response
            .status(400)
            .json({ msg: "User with this username does not exist" });
        }
        const hashedPassword = isExistingUser.password;
        const isValidPassword = await Bcrypt.compare(password, hashedPassword);

        if (!isValidPassword) {
          return response.status(400).json({ msg: "Invalid credentials" });
        }

        return response.status(200).json({ authenticated: true });
      });
    } catch (error) {
      return response
        .status(500)
        .json({ msg: "Server is currently down please try again later" });
    }
  }
}

export default AuthController;
