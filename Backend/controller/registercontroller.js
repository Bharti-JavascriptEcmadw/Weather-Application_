import userModel from "../models/userModel.js";

export const registercontroller = async (req, res,) => {
   try {

  const { email, name, password, phone}= req.body;
  console.log(name);
   console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

      // Validation
      if (!name) {
         return res.status(400).send({ success: false, message: 'Please provide name' });
      }
      if (!email) {
         return res.status(400).send({ success: false, message: 'Please provide email' });
      }
      if (!password) {
         return res.status(400).send({ success: false, message: 'Please provide password' });
      }
      if (!phone ){
         return res.status(400).send ({sucess:false, message: 'Please provide phone'})
      }
      // Check if user already exists
      const existinguser = await userModel.findOne({ email });
      if (existinguser) {
         return res.status(400).send({
            success: false,
            message: 'Email is already registered. Please login'
         });
      }

      // Create new user
      const user = await userModel.create({ name, email, password, phone });

      // Create JWT token
      const token = user.createJWT();
      const options = {
         expires: new Date(Date.now() + process.env.Cookie_Expire * 24 * 60 * 60 * 1000),
         httpOnly: true,
      };

      // Send response with token
      res.status(201)
         .cookie("token", token, options)
         .send({
            success: true,
            user,
            token,
         });
   } catch (err) {
      
      console.error(err);
      
   }
};


export const loginController = async (req, res,) => {
   try {
      const { email, password } = req.body;

      // Validation
      if (!email || !password) {
         return res.status(400).send({ success: false, message: 'Please provide both email and password.' });
      }

      // Find user by email
      const user = await userModel.findOne({ email });
      if (!user) {
         return res.status(401).send({ success: false, message: 'Invalid username or password.' });
      }

      // Check password match
      const isPasswordMatch = await user.comparePassword(password);
      if (!isPasswordMatch) {
         return res.status(401).send({ success: false, message: 'Invalid username or password.' });
      }

   

      // Create JWT token
      const token = user.createJWT();
      const options = {
         expires: new Date(Date.now() + process.env.Cookie_Expire * 24 * 60 * 60 * 1000),
         httpOnly: true,
      };

      // Send response with token
      res.status(200).cookie("token", token, options)
         .json({
            success: true,
            user,
            token
         });
   } catch (err) {
      // Handle any other errors
      console.error(err);
      // next(new Error('Error in login process.'));
   }
};


export const logoutController = async (req, res,) => {
   try {
      // Clear token from cookies
      res.status(200).cookie("token", "", {
         httpOnly: true,
         expires: new Date(Date.now()),
      })
         .json({
            success: true,
            message: 'User logged out successfully',
         });
   } catch (err) {
      // Handle any other errors
      console.error(err);
      next(new Error('Error during logout.'));
   }
};
export const getUser = async (req, res, next) => {
   try {
      const user = req.user;
      res.status(200).json({
         success: true,
         user,
         
      });
   } catch (err) {
      // Handle any other errors
      console.error(err);
      // next(new Error('Error fetching user data.'));
   }
};
