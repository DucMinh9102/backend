import express  from "express";
import homeController from '../controller/homeController.js';

let router = express.Router();

const initWebRoute = (app) => {
    router.get('/', homeController.getHomepage);
    router.get('/hehe', homeController.getHehe);
    router.get('/hehe/detail/user/:id', homeController.getDetailPage)
    router.get('/hehe/edit-user/:id', homeController.getUser)
    router.get('/hehe/upload', homeController.uploadFile)

    router.post('/hehe/create-new-user', homeController.createNewUser)
    router.post('/hehe/delete-user', homeController.deleteUser)
    router.post('/hehe/update-user', homeController.updateUser)
    router.post('/hehe/upload-profile-pic', homeController.handelUploadFile)


    return app.use('/', router)
}

export default initWebRoute;