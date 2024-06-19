import userModel from '../models/userModel.js';
import bcryptjs from 'bcryptjs';


//Registeration controller
export const registerController = async(req,res)=>{
    try {
        const {username , email , password} = req.body;

        //validation
        if(!username || !email || !password){
            return res.status(400).send({
                success:false,
                message:'Please Fill all fields!'
            })
        }

        //existing user
        const existingUser = await userModel.findOne({email});
        if(existingUser){
            return res.status(401).send({
                success:false,
                message:"User is already exists"
            })
        }
        
        const hashPassword = await bcryptjs.hash(password, 10);

        //save new user
        const user = new userModel({
            username:username,
            email:email,
            password:hashPassword
        });

        await user.save();
        return res.status(201).send({
            success:true,
            message:"User is created successfully!",
            user
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message:'Internal server error!',
            success:false
        })
    }
}

//Controller for Getting all users
export const getAllUsers = async(req , res)=>{
    try {
        const users = await userModel.find({});
        
        return res.status(200).send({
            userCount:users.length,
            success:true,
            message:'All users data',
            users
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:'Error in get all users',
            error
        })
    }
}


export const loginController =async (req , res)=>{
    try {
        const {email , password} = req.body;
        if(!email || !password){
            return res.status(400).send({
                success:false,
                message:'Please provide email or password!'
            })
        }

        //finding user in database
        const user = await userModel.findOne({email});

        //user not exist
        if(!user){
            return res.status(401).send({
                success:false,
                message:'user is not found!'
            })
        }

        const isMatch = await  bcryptjs.compare(password,user.password);

        if(!isMatch){
            return res.status(401).send({
                success:false,
                message:'Invalid credentials!'
            })
        }else{
            return res.status(200).send({
                success:true,
                message:'Login successfully!',
                user
            })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:'Internal server error!',
            error
        });
    }
}