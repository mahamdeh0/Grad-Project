const router = require('express').Router();

const authcontroller  = require('./controller/user.controller');
const { userSignup, userLogin } = require('./controller/user.validation');
const { validation } = require('../../middlewear/validation');
const { userauth } = require('../../middlewear/auth');


router.post('/signUp',validation(userSignup),authcontroller.userSignup)
router.get('/signin',authcontroller.userLogin);
router.get('/confirmEmail/:token',authcontroller.userconfirmEmail);

router.post('/subscribeToCourse',userauth(),authcontroller.subscribeToCourse)
router.get('/viewSubscribedCourses',userauth(),authcontroller.viewSubscribedCourses);
router.delete('/delete/:id',userauth(),authcontroller.deleteCourse)

router.post('/submitReview',userauth(),authcontroller.submitReview)
router.post('/submitSolution/:problemId',userauth(),authcontroller.submitSolution)

router.get('/sendcode',authcontroller.sendcode);
router.patch('/forgetpassword',authcontroller.forgetpassword);


router.post('/sendMessageToTeacher', userauth(), authcontroller.sendMessageToTeacher);
router.get('/conversationHistory/:userId/:teacherId', userauth(), authcontroller.getConversationHistory);

router.get('/booksview/:bookId',userauth(), authcontroller.viwebooks);
router.get('/viewarticles', authcontroller.viwearticle);

router.delete('/deleteUserByEmail',authcontroller.deleteuser)

module.exports=router; 
