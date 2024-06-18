const userModel = require('../models/userModles');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
const { get } = require('../routes/userRoute');
const userModles = require('../models/userModles');
const SECRET_KEY = 'Your_SECRET_KEY';
const SECRET_KEY_2 = 'Your_SECRET_KEY_2';

const pool = require('../config/userConfig.js');
const multer = require('multer');
const path = require('path');
const { log } = require('console');


const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads/');
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage });

class UserController {


  async registration(req, res) {
    const user = req.body;
    // console.log(user); 
    try {
      const users = await userModel.registration(user);
      // console.log(users);  
      res.status(200).json({ users })

    }
    catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'user alredy exists' });
    }
  }


  async logIn(req, res) {
    try {
      const { mail, password } = req.body;
      // console.log(mail,password);return;

      // Validate request data
      if (!mail || !password) {
        return res.status(400).json({ message: 'Invalid request. mail and password are required' });
      }

      // Find the user in the user model
      const foundUser = await userModel.logIn(mail, password);
      // console.log(foundUser);return;
      if (!foundUser) {
        return res.status(404).json({ status: 0, error: 'User not found' });
      }

      // Check if the provided password matches the hashed password in the database
      const isPasswordValid = await bcrypt.compare(password, foundUser.password);
      // console.log(isPasswordValid);return;

      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password' });
      }
      return res.status(200).json({ status: 1, message: 'login sucessfull', foundUser });
      // const tablename = 'blogregister';
      // const token = jwt.sign({ mail: foundUser.mail,tablename: tablename }, SECRET_KEY, { expiresIn: '24h' });
      // res.status(200).json({ status: 1, message: 'Login successful', token });


    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }


  async profile(req, res) {
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(401).json({ message: 'Authorization header missing' });
    }
    try {

      const decoded = jwt.verify(token, SECRET_KEY);

      const mail = decoded.mail;
      // console.log(mail);return;
      const user = await userModel.profile(mail);

      // console.log(user);return; 

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ status: 1, message: " user detailes", user });
    } catch (error) {
      console.error('Error fetching profile:', error);
      res.status(401).json({ message: 'Invalid token' });
    }


  }




  async   blogpost(req, res) {


    try {
      upload.single('file')(req, res, async (err) => {

        if (err) {
          return res.status(400).json({ message: 'File upload unsuccessful', error: err.message });
        }

        const uploadedFile = req.file;

        const user = req.body;
        // const { title, description, content  } =user ; 
        // console.log(uploadedFile);return;      

        if (!uploadedFile) {
          return res.status(400).json({ message: 'No file provided' });
        }


        const uplodes = await userModel.blogpost(uploadedFile, user);
        // console.log(uplodes);return
        // if (!uplodes) {
        //   return res.status(400).json({ status:0, message: 'File uploaded unsuccessfully' });
        // }

        res.status(200).json({ status: 1, message: 'File uploaded successfully', uplodes });
      });

    }
    catch (error) {
      console.error('Error posting user:', error);
      res.status(500).json({ message: 'this post alredy exists' });
    }

  };
  // async uplodeFile(req, res) {
  //     try {

  //       upload.single('file')(req, res, async (err) => {
  //         if (err) {
  //           return res.status(400).json({ message: 'File upload unsuccessful', error: err.message });
  //         }

  //         const uploadedFile = req.file;
  //         if (!uploadedFile) {
  //           return res.status(400).json({ message: 'No file provided' });
  //         }

  //         // Assuming fileModel.uplodeFile is an asynchronous function
  //         const uplodes = await fileModel.uplodeFile(uploadedFile);
  //         // console.log(uplodes);return
  //         if (!uplodes) {
  //           return res.status(400).json({ status:0, message: 'File uploaded unsuccessfully' });
  //         }

  //         res.status(200).json({ status:1, message: 'File uploaded successfully' });
  //       });
  //     } catch (error) {
  //       console.error(error);
  //       res.status(500).json({ error: 'Error uploading file' });
  //     }
  //   }










  //   async newspost(req,res){

  //     try {
  //          const user = await userModel.newspost(name);
  //      if (!user) {
  //           return res.status(404).json({ message: 'table not found' });
  //         }

  //         res.status(200).json({status:1 ,message: " table detailes",user });
  //       } catch (error) {
  //         console.error('Error fetching profile:', error);
  //         res.status(401).json({ message: 'Invalid token' });
  //       }
  // };


  async newspost(req, res) {
    try {
      const item = await userModel.newspost();

      if (!item) {
        return res.status(404).json({ message: 'table not found' });
      }
      res.status(200).json({ status: 1, message: 'your post detials ', item });

    }
    catch (error) {
      console.error('Error getting products:', error);
      res.status(500).json({ status: 0, message: 'Internal Server Error' });
    }
  }


}
module.exports = new UserController();