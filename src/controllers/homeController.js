import db from '../models'
import USERcrudSevice from '../services/USERcrudSevice'
import mediacrudSevice from '../services/mediacrudSevice'


let getHomePage = async (req, res) =>{
    try {
        let data = await db.user.findAll();
        return res.render('homepage.ejs',{
            data : JSON.stringify(data),
        });


        
    } catch (error) {
        console.log(error);
        
    }

    
}











// ------------Singer------------


let getSinger =(req, res) =>{
    console.log("getsinger", getSinger)
    return res.render('singer.ejs')
}

let postNewSinger = async (req, res) =>{
    console.log('reqBody', req.body)
    let message = await mediacrudSevice.createNewSinger(req.body)
    console.log(message)
    return res.send('create singer successfully')
}




// ------------Album------------

let getAlbumPage =(req, res) =>{
    return res.render('album.ejs')
}












// ------------song------------


let getsongPage =(req, res) =>{
    return res.render('test.ejs')
}













// ------------<<<<<<<<<.>>>>>>>>>>>>>>------------









// ------------user------------

let getUser =(req, res) =>{
    return res.render('createUser.ejs')
}
let postNewUSer = async (req, res) =>{
    let message = await USERcrudSevice.createNewUser(req.body)
    console.log(message)
    return res.send('create user  successfully')
}
let getdisplayUSER = async (req, res) =>{

    let data = await USERcrudSevice.getAllUser();
    return res.render('displayUSER.ejs', {
        dataTable: data
    })
}
let getEditUSER = async (req, res) =>{
   let userId = req.query.id;
    
      if (userId) {
         let userData = await USERcrudSevice.getUserInfoById(userId);


            return res.render('editUSER.ejs',{

                user : userData,
            })


        }
        else{
            return res.send(' User not found !')

     }


}

let putUSER = async (req, res) =>{
    let data = req.body;
    let allUsers = await USERcrudSevice.updateUserData(data);
    
    return res.render('displayUSER.ejs', {
        dataTable : allUsers
    })
}

let deleteUSER = async (req, res) =>{
    let deleteId = req.query.id;
     if(deleteId){
         await USERcrudSevice.deleteUserInfoById(deleteId);
         return res.send(' Delete user successfully!')

     }
     else{
        return res.send(' user not found!')  
     }

  
 
 
 }
























module.exports = {
    getHomePage: getHomePage,
    getAlbumPage: getAlbumPage,
    getsongPage: getsongPage,
    getUser : getUser,
    getSinger : getSinger,
    postNewSinger: postNewSinger,
    postNewUSer : postNewUSer,
    getdisplayUSER : getdisplayUSER,
    getEditUSER : getEditUSER,
    putUSER : putUSER,
    deleteUSER : deleteUSER,
    

}