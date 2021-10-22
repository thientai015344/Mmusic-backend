import express from 'express';
import homeController from '../controllers/homeController';
import userController from '../controllers/userController'

let router = express.Router();

let initWebRoutes = (app) => {

    router.get('/',homeController.getHomePage);

    router.get('/song', homeController.getAboutPage);
    router.get('/user', homeController.getUser);
    router.post('/post-user', homeController.postNewUSer);
    router.get('/get-user', homeController.getdisplayUSER);
    router.get('/edit-user', homeController.getEditUSER);
    router.post('/put-user', homeController.putUSER);
    router.get('/delete-user', homeController.deleteUSER);
    



    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-users', userController.handleGetAllUSER);
    router.post('/api/create-new-userAdm', userController.handleCreateNewUser);
    router.put('/api/edit-userAdm', userController.handleEditUser);
    router.delete('/api/delete-userAdm', userController.handleDeleteUser);






    app.use("/", router)
}
module.exports = initWebRoutes;