import USERSevice from '../services/USERSevice';


let createNewSinger = async (data) => {
    return new Promise(async(resolve, reject) => {
        try {
           
            await db.singer.create({

                singername: data.singername,
                description: data.description,
                avatasinger: data.avatasinger,
               
            })


            resolve(' create new singer succeed!')
           
        } catch (error) {
            reject(error);
            
        }

    })
 

    
}


let handleLogin = async(req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    if(!username || !password){
        return res.status(500).json({

            errCode: 1,
            message:  'Missing input parameter  '

        });
    }
    
    let userData = await USERSevice.handleUserLogin(username, password);
    return res.status(200).json({
    errCode: userData.errCode,
    message:  userData.errMessage,
    user: userData.user ? userData.user : {}

    })


}



let handleGetAllUSER = async(req, res) => {
    let id = req.query.id; 
    if(!id){
        return res.status(200).json({
            errCode : 1,
            errMessage :'missing required parameters',
            user:[]
        })
    }
    let user = await USERSevice.getAllUsers(id);
    return res.status(200).json({
        errCode : 0,
        errMessage :'ok',
        user
    })

}


let handleCreateNewUser = async (req, res) =>{
    let message = await USERSevice.CreateNewUser(req.body);
    return res.status(200).json(message);

}

//let handleEditUser async (req, res) =>{}


let handleDeleteUser = async (req, res) =>{
    if(!req.body.id){
        return res.status(200).json({
             errCode: 1,
             errMessage: 'missing required parameter !'

        })
    }
    let message = await USERSevice.deleteUser(req.body.id);
    return res.status(200).json(message);
}

let handleEditUser = async(req, res) => {
    let data = req.body;
    let message = await USERSevice.updateUserData(data);
    return res.status(200).json(message);
    
 

}













module.exports ={
    createNewSinger: createNewSinger,
    handleLogin: handleLogin,
    handleGetAllUSER: handleGetAllUSER,
    handleCreateNewUser: handleCreateNewUser,
    handleDeleteUser: handleDeleteUser,
    handleEditUser: handleEditUser,
}