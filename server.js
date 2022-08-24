const
   express = require('express'),
   app = express(),
   PORT = process.env.PORT || 4321,
   mongoose = require("mongoose")

require("dotenv").config()
require("./db")()

app.use(express.json());

// schema1
const UsersSchema = new mongoose.Schema({
   name: { type: String, required: true },
   email: { type: String, required: true },
   password: { type: String, required: true },
})
const SchoolsSchema = new mongoose.Schema({
   name: String,
   adrees: String,
   students: [
      { type: mongoose.Types.ObjectId, ref: "Users" }
   ]
})
const postsSchema = new mongoose.Schema({
   name: [{type:mongoose.Types.ObjectId,ref:"Users"}],
   text: String,
   res: [
      { type: mongoose.Types.ObjectId, ref: "Coment" }
   ],
   likes:Number
})
const comentSchema = new mongoose.Schema({
   name: [{type:mongoose.Types.ObjectId,ref:"Users"}],
   text: String,
   likes:Number
})

// data
const
   user = { name: "avi", email: "a@a", password: "1234" },
   school = { name: "working", adrees: "jerusalem", students: ["6295f740ff655184b925b787"] },
   post={ name:["6295f740ff655184b925b787"],text : "ari is good",res:["62960c12bcd149fe983a9daf"],likes:5},
   coment = {name:["6295f740ff655184b925b787"],text:"he isn't",likes:5 }

// models
const
   UserModel = new mongoose.model("Users", UsersSchema),
   SchoolModel = new mongoose.model("School", SchoolsSchema),
   postModel = new mongoose.model("Post",postsSchema),
   comentModel = new mongoose.model("Coment",comentSchema)


// functions
const getUsers = async () => await UserModel.find()
// const getschool = async () => await SchoolModel.find().populate({path:"students",select:["name","email"]})
const createUser = async (u) => await UserModel.create(u)
const createComent = async (u) => await comentModel.create(u)
const getComent = async () => await comentModel.find()
const getpost = async () => await postModel.find().populate({path:"name",select:["name"]}).populate({path:"res",select:["text"]})
const createpost = async (u) => await postModel.create(u)
// const createschool = async (s) => await SchoolModel.create(s)







// test area
// getUsers().then(res => console.log((res)))
// createUser(user).then(res=> console.log((res)))
// createschool(school).then(res => console.log((res)))
// getschool().then(res => console.log((JSON.stringify(res))))
// createpost(post).then(res=> console.log((res)))
getpost().then(res=>console.log(JSON.stringify(res)))
// createComent(coment).then(res=> console.log((res)))
// getComent().then(res=>console.log(res))

app.listen(PORT, () => console.log(`Connected to port ${PORT}`));