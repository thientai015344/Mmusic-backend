import express from 'express';
import homeController from '../controllers/homeController';
import userController from '../controllers/userController'
import SingerController from '../controllers/SingerController'
import albumController from '../controllers/albumController'
import playlistController from '../controllers/playlistController'
import trackController from '../controllers/trackController'


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
    router.get('/api/get-all-singerfortrack', SingerController.handleGetAllSingerForTrack);
    router.post('/api/create-new-singer', SingerController.handleCreateNewSinger);
    router.put('/api/edit-singer', SingerController.handleEditSinger);
    router.delete('/api/delete-singer', SingerController.handleDeleteSinger);



    //--------------------singer---------------------//


    
    //--------------------album---------------------//


    router.get('/api/get-all-album', albumController.handleGetAllAlbum);
    router.get('/api/get-detail-album-by-id', albumController.handleGetDetailAlbum);
    router.post('/api/create-new-album', albumController.handleCreateNewAlbum);
    router.put('/api/edit-album', albumController.handleEditAlbum);
    router.delete('/api/delete-album', albumController.handleDeleteAlbum);


    //--------------------album---------------------//




    //--------------------playlist---------------------//


    router.get('/api/get-all-playlist', playlistController.handleGetAllPlaylist);
    router.post('/api/create-new-playlist', playlistController.handleCreateNewPlaylist);
    router.put('/api/edit-playlist', playlistController.handleEditPlaylist);
    router.delete('/api/delete-playlist', playlistController.handleDeletePlaylist);



    //--------------------playlist---------------------//


    
    //--------------------track---------------------//


    router.get('/api/get-all-track', trackController.handleGetAllTrack);
    router.post('/api/create-new-track', trackController.handleCreateNewTrack);
    router.put('/api/edit-track', trackController.handleEditTrack);
    router.delete('/api/delete-track', trackController.handleDeleteTrack);


    //--------------------track---------------------//





    app.use("/", router)
}
module.exports = initWebRoutes;