import express from 'express';
import homeController from '../controllers/homeController';
import userController from '../controllers/userController'
import SingerController from '../controllers/SingerController'



let router = express.Router();

let initWebRoutes = (app) => {

    router.get('/',homeController.getHomePage);
    router.get('/album', homeController.getAlbumPage);
    router.get('/song', homeController.getsongPage);
    router.get('/singer', homeController.getSinger);
    router.post('/post-singer', homeController.postNewSinger);
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



    //--------------------singer---------------------//


    router.get('/api/get-all-singer', SingerController.handleGetAllSinger);
    router.post('/api/create-new-singer', SingerController.handleCreateNewSinger);
    // router.put('/api/edit-userAdm', userController.handleEditUser);
    // router.delete('/api/delete-userAdm', userController.handleDeleteUser);



    //--------------------singer---------------------//








    app.use("/", router)
}
module.exports = initWebRoutes;