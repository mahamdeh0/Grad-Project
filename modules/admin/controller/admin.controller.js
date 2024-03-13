let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
const { adminModel } = require("../../../DB/model/Admin.model");
const { courseModel } = require("../../../DB/model/course.model");
const { articleModel } = require("../../../DB/model/article.model");
const { ProblemModel } = require("../../../DB/model/problem.model");
const { userModel } = require("../../../DB/model/user.model");
const { teacherModel } = require("../../../DB/model/Teacher.model");

const adminSignup = async (req,res)=>{


    const {name,email,password,age,gender}= req.body;

    try{
    const admin = await adminModel.findOne({email:email});

    if(admin){

        res.status(409).json({message:"email exist"})
    }else{

        const hashPassword = await bcrypt.hash(password,parseInt(process.env.saltRound));
        const newAdmin = new adminModel({email:email,userName:name, password:hashPassword,age:age,gender:gender});
        const savedUser = await newAdmin.save();

        if(!savedUser){
            res.status(400).json({message:"fail to signup"});
        }else{
            res.status(201).json({message:"done signUp"});
        }
    }}catch{
        res.status(400).json({err:error.message})


    }

}
 
const adminLogin = async (req,res)=>{

    const{email,password} = req.body;
    try{
    const admin = await adminModel.findOne({email});

    if(!admin){
        res.json({message:"invalid account"});
    }else{

        const match = await bcrypt.compare(password,admin.password);

        if(!match){

            res.json({message:"invalid password"});


        }else{
            const token = jwt.sign({id:admin._id},process.env.logintoken,{expiresIn:60*60*24});


            res.json({message:"done signin ",token});


        }

    }}catch{
        res.status(400).json({err:error.message})

    }


}

const addcourse = async (req, res) => {
    const { courseName, Description, maximum, price, location, present } = req.body;
    const adminId = req.admin._id; 

    try {
        const newcourse = new courseModel({ courseName:courseName, Description:Description,maximum:maximum,price:price,location:location,present:present,admin: adminId });
        const savedcourse = await newcourse.save();
        if(savedcourse){
        res.status(201).json({ message: "Course successfully saved" });
    }else{
        res.status(500).json({ message: "Error saving course" });

    }
    } catch (error) {
        console.error("Error saving course:", error);
        res.status(500).json({ message: "Error saving course", error: error.message });
    }
};

const addarticle = async (req, res) => {
    const { articleName, Description } = req.body;
    const adminId = req.admin._id; 

    try {
        const newartical = new articleModel({ articleName:articleName, Description:Description,admin: adminId });
        const savedarticle= await newartical.save();
        if(savedarticle){
        res.status(201).json({ message: "article successfully saved" });
    }else{
        res.status(500).json({ message: "Error saving article" });

    }
    } catch (error) {
        console.error("Error saving article:", error);
        res.status(500).json({ message: "Error saving article", error: error.message });
    }
};

const approveCourse = async (req, res) => {
    const { courseId } = req.params;
    try {
        const course = await courseModel.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        
        course.isApproved = true;
        await course.save();

        res.json({ message: "Course approved successfully" });
    } catch (error) {
        console.error("Error approving course:", error);
        res.status(500).json({ message: "Error approving course", error: error.message });
    }
};

const addproblem = async (req, res) => {
    const { description, answer } = req.body;

    try {
        const newProblem = new ProblemModel({
            description,
            answer,
        });

        const savedProblem = await newProblem.save();
        res.status(201).json({
            message: "Problem added successfully",
            problem: savedProblem
        });
    } catch (error) {
        console.error('Error adding problem:', error);
        res.status(500).json({ message: "Error adding problem", error: error.message });
    }
};

const viewAllUsersAndTeachersAndCourses = async (req, res) => {
    try {
        const users = await userModel.find({}, 'userName _id').lean(); 
        const teachers = await teacherModel.find({}, 'teacherName _id').lean();
        const courses = await courseModel.find({}, 'courseName _id').lean();

        const summary = {
            totalUsers: users.length,
            totalTeachers: teachers.length,
            totalcourse: courses.length,
            users: users.map(user => ({ id: user._id, name: user.userName })),
            teachers: teachers.map(teacher => ({ id: teacher._id, name: teacher.teacherName })),
            courses: courses.map(course => ({ id: course._id, name: course.courseName }))

        };

        res.status(200).json(summary);
    } catch (error) {
        console.error("Error fetching users and teachers summary:", error);
        res.status(500).json({ message: "Error retrieving data", error: error.message });
    }
};




module.exports={adminSignup,adminLogin,approveCourse,addcourse,addarticle,addproblem,viewAllUsersAndTeachersAndCourses}