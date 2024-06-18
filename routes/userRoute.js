
// const express = require('express');
// const router = express.Router();
// const userController = require('../controllers/userController.js');

// const multer = require('multer');

// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, 'uploads/');
//   },
//   filename: (req, file, callback) => {
//     callback(null, file.originalname);
//   },
// });

// const upload = multer({ storage });

// router.post('/imageupload', upload.single('file'), userController.imageupload);


// router.post('/blogregister',userController.registration);
// router.post('/blogsigin',userController.logIn);
// router.get('/blogprofile', userController.profile);
 
 
 
// router.post('/blogpost', userController.blogpost);
// router.get('/newspost', userController.newspost);






// module.exports = router;






const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

 

router.post('/blogregister',userController.registration);
router.post('/blogsigin',userController.logIn);
router.get('/blogprofile', userController.profile);
 
 
 
router.post('/blogpost', userController.blogpost);
router.get('/newspost', userController.newspost);







module.exports = router;