const {
    getAllUsersService,
    getUserByEmailService,
    createUserService,
    deleteUserService,
    updateUserService,
  } = require("../services/user.service");
  const bcrypt = require("bcrypt");
  const jwt=require("jsonwebtoken")
  const { validateUser } = require("../validators/user.validator");

const users = [
    {
      userName: "youssef",
      email: "youssef@gmail.com",
      password: "277Yq",
    },

    {
      userName: "mohamed",
      email: "mohamed@gmail.com",
      password: "312Mq",
    },

    {
      userName: "ahmed",
      email: "ahmed@gmail.com",
      password: "231@Aq",
    },
];

const getAllUsers = async (req, res) => {
    try {
      const getUserFS = await getAllUsersService();
      res.send(getUserFS);
    } catch(e) {
      console.log("error in getting all Users");
    }
};


const getUserByEmail = async (req, res) => {
    try {
      const { email } = req.params;
      const getUserEmailFS = await getUserByEmailService(email);
      if (!getUserEmailFS) res.status(404).send("The user is not found");
      res.send(getUserEmailFS);
    } catch(e) {
      console.log("error in getting User by Email");
    }
};


const addNewUser = async (req, res) => {
    try {
      const { userName, email, password } = req.body;
      if (!userName || !email)
        return res.status(400).json({ msg: "Please fill all fields" });
      const fetchUser = await getUserByEmailService(email);
      if (fetchUser)
        return res.send(
          "This email is already exist, please choose another email.."
        );
    
      const passwordHash = await bcrypt.hash(password, 10);
      
      const { error, value } = validateUser(req.body);
      if (error) return res.status(400).send("Bad request");
      const newUserFS = await createUserService({
        userName,
        email,
        passwordHash,
      });
      res.status(201).send(newUserFS);
    } catch(e) {
      console.log("Error In Adding New User");
    }
};


const updateUser = async (req, res) => {
    try {
      const { email } = req.params;
      const getUserEmailFS = await getUserByEmailService(email);
      if (!getUserEmailFS) return res.status(404).send("The user not found");
  

      const { error, value } = validateUser(req.body);
      if (error) return res.status(400).send("Invalid Input");
      const updateUserFS = await updateUserService(email, req.body);
      res.send(updateUserFS);
    } catch(e) {
      console.log("Error In Updating The User Data");
    }
};


const loginUser = async (req, res) => {
    try{
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ msg: "Please fill all fields" });
    const userData = await getUserByEmailService(email);
    if (!userData)
      return res.status(400).json({ message: "Email or Password is incorrect" });
    const isValidPassword = bcrypt.compare(password, userData.passwordHash);
    if(!isValidPassword)
    return res.status(401).send({message:"password no invalid"})

  const token =jwt.sign({email},"myjwtsecret",{expiresIn:"1h"})
  console.log(token)
  res.header({jwt:token}).send({token:token,message:"token access",data:{name:userData.userName,email:userData.email}})
  }catch(error){
    res.status(500).send(error.message);
}};


const deleteUser = async (req, res) => {
    try {
      const { email } = req.params;
      const getUserEmailFS = await getUserByEmailService(email);
      if (!getUserEmailFS) return res.status(404).send("The user not found");
      deleteUserService(email);
      res.send("user deleted..");
    } catch(e) {
      console.log("Error In Deleting the User Data");
    }
};


module.exports = {
  getAllUsers,
  getUserByEmail,
  addNewUser,
  updateUser,
  deleteUser,
  loginUser,
};
