const pool = require('../config/userConfig.js');
const valid = require('../middleWare/userValidation.js');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const FAVOURITES_FILE_PATH = path.join(__dirname, 'favourites.json');



class userModel {
    async registration(user) {
        const { name, mobile, gender, mail, password } = user;
        const hashedPassword = await bcrypt.hash(password, 10);
        const ismail = valid.validateEmail(mail);
        const ispassword = valid.validatePassword(hashedPassword);
        const ismobile = valid.validatePhoneNumber(mobile);
        const isname = valid.validatename(name);
        const isgender = valid.validateGender(gender);




        if (name) {
            if (mobile) {
                if (gender) {
                    if (mail) {
                        if (password) {
                            if (isname) {
                                if (ismail) {
                                    if (ispassword) {
                                        if (ismobile) {
                                            if (isgender) {

                                                const query = 'INSERT INTO blogregister    ( name, mobile, gender, mail, password) VALUES ($1,$2,$3,$4,$5) RETURNING *';
                                                const values = [name, mobile, gender, mail, hashedPassword];
                                                const { rows } = await pool.query(query, values);
                                                return rows[0];

                                            } else {
                                                return { error: "invalid gender" };
                                            }
                                        }
                                        else {
                                            return { error: "invalid mobile number" };
                                        }
                                    }
                                    else {
                                        return { error: "invalid password" };
                                    }
                                }
                                else {
                                    return { error: "invalid email" };
                                }
                            } else {
                                return { error: "invalid name" };
                            }
                        } else {
                            return { error: "required password" };
                        }
                    } else {
                        return { error: "required mail" };
                    }
                } else {
                    return { error: "required gender" };
                }
            } else {
                return { error: "required mobile" };
            }
        } else {
            return { error: "required name" };
        }
    }


    async logIn(mail, password) {



        if (password) {
            const query = 'SELECT * FROM blogregister where mail=$1';
            const values = [mail];
            const { rows } = await pool.query(query, values);
            return rows[0];

        } else {
            return { error: "invalid password" };
        }


    }


    async profile(mail) {

        try {
            const query = 'SELECT * FROM blogregister WHERE mail = $1';
            const values = [mail];
            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }




    async blogpost(uploadedFile, user) {

        // const file_url = fs.readFileSync(file.path); // Read the file
        const currentDate = new Date();
        const { title, description, content } = user;
        const { originalname } = uploadedFile;
        // console.log(title, description, content,path);return;   
        // const { title, description, content } = user;         

        // Assuming 'file' is the key used for the  file upload
        // const file = user.file;

        const query = 'INSERT INTO blog_posts  (title, description, content, file_url, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const values = [title, description, content, originalname, currentDate]; // Use file.buffer to get the file data

        const { rows } = await pool.query(query, values);
        return rows[0];

    }



    // async newspost(mail) {

    //     try {
    //         const query = 'SELECT * FROM blog_posts WHERE mail = $1';
    //         const values = [mail];
    //         const result = await pool.query(query, values);
    //         return result.rows[0];  
    //     } catch (error) {
    //         throw error;
    //     }
    // }





    async newspost() {
        const query = 'SELECT * FROM blog_posts';
        const { rows } = await pool.query(query);
        // console.log(rows);return;
        return rows;
    }






}

module.exports = new userModel();