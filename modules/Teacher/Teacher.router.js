const router = require('express').Router();

const authcontroller  = require('./controller/Teacher.controller');
const { teacherSignup, teacherLogin } = require('./controller/Teacher.validation');
const { validation } = require('../../middlewear/validation');
const { teacherauth } = require('../../middlewear/auth');
const { myMulter, HME } = require('../../services/multer');

router.post('/addBook', teacherauth(), myMulter(['application/pdf']).single('book'), HME, authcontroller.addBook);

 
router.post('/signUp',validation(teacherSignup),authcontroller.teacherSignup);
router.get('/signin',validation(teacherLogin),authcontroller.teacherLogin);
router.get('/confirmEmail/:token',authcontroller.teacherconfirmEmail);

router.post('/addcourse',teacherauth(),authcontroller.addcourse);
router.post('/addarticle',teacherauth(),authcontroller.addarticle);

router.get('/viewTeacherRating',teacherauth(),authcontroller.viewTeacherRating);
router.get('/myCourses',teacherauth(),authcontroller.viewCourses);

router.delete('/deleteUserByEmail',authcontroller.deleteteacher)

router.post('/sendMessageToUser', teacherauth(), authcontroller.sendMessageToUser);
router.get('/conversationHistory/:teacherId/:userId', teacherauth(), authcontroller.getConversationHistory);

router.get('/sendcode',authcontroller.sendcode);
router.patch('/forgetpassword',authcontroller.forgetpassword);

module.exports=router; 
