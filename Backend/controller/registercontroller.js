
   import userModel from "../models/userModel.js"


   export const registercontroller =async(req,res, next)=>{
   try{
   const {name, email, password}=req.body;
   if(!name){
      next('name is required')
      return res.status(400).send({success:false,message:`please provide name`})
   }
   if(!email){
      next('emial is require');
      return res.status(400).send({success:false,message:`please provide email`})
   }
   if(!password){
   next('password is require');

      return res.status(400).send({success:false,message:`please provide password`})
   }
 

   const existinguser=await userModel.findOne({email})
   if(existinguser){
   next("already register please login");
   return res.status(200).send({
         success:false,
         message:'Email is already register please Login'
      });
   };
   //!!if all the condition are false then save the register detail 

   const user =await userModel.create({name,email,password })

   // ?? create jwt token and save in user model 
   const token=user.createJWT()
   const options={
      expires:new Date(
            Date.now()+process.env.Cookie_Expire*24*60*60*1000
      ),
      httpOnly:true,
   };

   // const token= sendToken()
   res.status(201)
   .cookie("token", token, options)
   .send({
      success:true,
      message:'User registered Successfully',
      user,
      token,
   
   })
      }
      catch(err){
         //   console.log(err)
         // res.status(400).send({
               // message:'Error in register controller',
               // success:false,
               // err
         next(`Please provide all the details`);
         }

      };





      //!!Login credintial 


      const loginController = async(req,res,next)=>{
         try{

         const {email,password}=req.body;

         //??validation

         if(!email||!password ){
            next('please provide all field').select("+password")}
          
         const user=await userModel.findOne({email})
            if(!user){
               next("invalid user name or password")}
               
            const isPasswordMatch=await user.comparePassword(password)
            if(!isPasswordMatch){
            next('invalid username or password ')
            }
          

            user.password=undefined;

            const token= user.createJWT()
            const options={
               expires:new Date(
                  Date.now()+process.env.Cookie_Expire*24*60*60*1000
               ),
               httpOnly:true,
         };

            res.status(200).cookie("token",token,options)
            .json({
            success:true,
            message:'Login Successfully',
            user,
            token
            })}

            catch(err){
               next(`Please provide all the details`);}
         };

      


   export {loginController};

   // !! logout---------------------
   

   export const logoutController = async(req,res,next)=>{
      // const token = req.cookies.Cookies;
      // console.log(token)

         res.status(201).cookie("token", " ", {
            httpOnly:true,
            expire:new Date(Date.now),
         })
         .json({
            success :true, 
            message:"user logout successfully"   });

      
   }

   export const getUser= async(req,res,next)=>{
     const user= req.user;
     res.status(200)
     .json({
      success:true,
      user,
     });
   };



   
