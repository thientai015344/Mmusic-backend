import db from '../models'
import bcrypt  from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

let hashUserPasswords = (password) => {
    return new Promise( async (resolve, reject) => {

        try {       
            var hashPassword =  await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
            
        } catch (error) {
            reject(error);
            
        }
    })
    
}



let handleUserLogin = (username, password) =>{
    return new Promise(async(resolve, reject) =>{
        try {
            let userData ={};

            let isExist = await checkUsername(username);
            if(isExist) {
                let user = await db.user.findOne({
                    where: {username: username},
                    attributes: ['id', 'roleId', 'password'],
                    raw: true

                });
                if(user){
                   let check = await bcrypt.compareSync(password, user.password);
                    if(check){
                     
                        userData.errCode = 0;
                        userData.errMessage = 'Ok';
                        delete user.password;
                        userData.user = user;
                        
                    }
                    else {
                        userData.errCode = 3;
                        userData.errMessage = 'sai mật khẩu'
                    }
                }else{
                    userData.errCode = 2;
                    userData.errMessage = `User's not found`;
                }
                
           
            }
            else{

                userData.errCode = 1;
                userData.errMessage =`Your's username isn't exist your system. please try other username !`;
              
            }
            resolve(userData);
            
        } catch (error) {
            reject(error);
            
        }
    })
}


let checkUsername = (username) => {
    return new Promise(async(resolve, reject) =>{
        try {
            let user = await db.user.findOne({
              where: { username: username}
            })
            if(user){
                resolve(true);
            }
            else{
                resolve(false);
            }
            
        } catch (error) {
            reject(error);   
        }
    })
}


let getAllUsers = (userId) => {

    return new Promise(async(resolve, reject) =>{
        try {
            let users = '';
            if(userId === 'ALL') {

                users = await db.user.findAll({

                    attributes:{
                        exclude: ['password'],
                    }

                });
         

            }
            
            if(userId && userId !== 'ALL') {
                users = await db.user.findOne({
                    where:{id : userId},
                    attributes:{
                        exclude: ['password'],
                    }
                })
                   
            }
            resolve(users);
        
        } catch (error) {
            reject(error);     
        }
    })
    
}
   
let CreateNewUser = (data) =>{
    return new Promise(async(resolve, reject) =>{
        try {
            let check = await checkUsername(data.username);
            if(check==true){
                
                resolve({
                    errCode : 1, 
                    errMessage: 'this username is already in used, plz try anothe username'
                })
                
            }else{
                let hashPasswordFromBcrypt = await hashUserPasswords(data.password);
                
                await db.user.create({
    
                    username: data.username,
                    password: hashPasswordFromBcrypt,
                    email: data.email,
                    phonenumber: data.phonenumber,
                    roleId: data.roleId,
                })
    
                resolve({
                    errCode :0 ,
                    message : 'ok'
    
                })
            }
        } catch (error) {
        reject (error); 
            
        }
    })
}

let deleteUser = (id) => {
    return new Promise(async(resolve, reject) => {
        let user = await db.user.findOne({
            where: { id: id}
        })
        if(!user){
            resolve ({ 
                errCode: 2,
                errMessage : `The user isn't exist`
            })
        }
       // awaxit user.destroy();
       await db.user.destroy({
           where: { id: id}
       });
        
        resolve({ 
            errCode: 0,
            message : `delete successfully'`


        })

        
    })

}

let updateUserData = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            if(!data.id){
                resolve({ 
                    errCode: 2,
                    errMessage:'missing required data'
                })
            }
            let user  = await db.user.findOne({ 
                where : {id : data.id},
                raw : false
            })
            if(user) {
                user.username = data.username,
                user.email = data.email,
                user.phonenumber = data.phonenumber,
                await user.save();
                    // sername = data.username,
                    // mail = data.email,
                    // phonenumber = data.phonenumber,

               // });
                resolve({
                    errCode: 0,
                    message:'updata successfully',
                })
               
            } else{
                resolve(
                    {
                        errCode: 1,
                        errMessage: `user's not found`
                    }
                );
            }

            
        } catch (error) {
            reject(error);
            
        }
    })

}

    
    










module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    CreateNewUser: CreateNewUser,
    deleteUser: deleteUser,
    updateUserData: updateUserData,
}