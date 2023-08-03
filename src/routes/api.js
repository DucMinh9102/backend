import express  from "express";
import apiController from "../controller/apiController.js";

let router = express.Router();

const initAPIRoute = (app) => {
    router.get('/users', apiController.getAllUser);
    router.post('/create-user', apiController.createNewUser);
    router.put('/update-user', apiController.updateUser);
    router.delete('/delete-user/:id', apiController.deleteUser);

    return app.use('/api/v1', router)
}

export default initAPIRoute;