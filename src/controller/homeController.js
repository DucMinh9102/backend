import pool from "../config/connectDB.js";
import multer from "multer";
import path from "path";

let getHomepage = (req, res) => {
    res.send('Hello World!')
}

let dataUser = [];

let getHehe = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM `users`');
    return res.render('example.ejs', { dataUser: rows })
    console.log(rows);
}
let getDetailPage = async (req, res) => {
    let id = req.params.id;
    let [user] = await pool.execute(`select * from users where id = ?`, [id])
    console.log('check', res.params)
    return res.send(JSON.stringify(user))
}

let createNewUser = async (req, res) => {
    let { firstName, lastName, email, address } = req.body
    await pool.execute(`insert into users(firstName, lastName, email, address) values(?, ?, ?, ?)`, [firstName, lastName, email, address])
    return res.redirect('/hehe')
}

let deleteUser = async (req, res) => {
    let userID = req.body.userID;
    await pool.execute('delete from users where id = ?', [userID])
    return res.redirect('/hehe');
}

let getUser = async (req, res) => {
    let id = req.params.id;
    let [user] = await pool.execute(`select * from users where id = ?`, [id]);
    return res.render('updateUser.ejs', { dataUser: user[0] });
}

let updateUser = async (req, res) => {
    let { firstName, lastName, email, address } = req.body
    await pool.execute('update users set firstName=?, lastName=?, email=?, address=? where id=?', [firstName, lastName, email, address, id])
    return res.redirect('/hehe')
}

let uploadFile = async (req, res) => {
    return res.render('uploadFile.ejs')
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const imageFilter = function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

let handelUploadFile = async (req, res) => {
    let upload = multer({ storage: storage, fileFilter: imageFilter }).single('profile_pic');

    upload(req, res, function (err) {

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }

        res.send(`You have uploaded this image: <hr/><img src="${req.file.path}" width="500"><hr /><a href="./">Upload another image</a>`);
    });
}

export default {
    getHomepage,
    getHehe,
    getDetailPage,
    createNewUser,
    deleteUser,
    getUser,
    updateUser,
    uploadFile,
    handelUploadFile,
    imageFilter
}