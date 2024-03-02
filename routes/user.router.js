const express = require("express")
const router = express.Router()
const { getAllUsers, 
        getUserByEmail, 
        addNewUser, 
        updateUser, 
        deleteUser, 
        loginUser 
} = require("../controller/users.controller")

router.get("/", getAllUsers)
router.get("/:email", getUserByEmail)
router.get("/", addNewUser)
router.post("/login", loginUser)
router.patch("/:email", updateUser)
router.delete("/:email", deleteUser)

module.exports = router