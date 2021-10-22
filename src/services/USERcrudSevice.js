import bcrypt  from 'bcryptjs';
import db from '../models'
const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPasswords(data.password);
            await db.user.create({

                username: data.username,
                password: hashPasswordFromBcrypt,
                email: data.email,
                phonenumber: data.phonenumber,
                roleId: data.roleId,
            })


            resolve(' create new user succeed!')
           
        } catch (error) {
            reject(error);
            
        }

    })
 

    
}

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

let getAllUser = () => {

    return new Promise(async (resolve, reject) => {
        try {

            let users = db.user.findAll({
                raw: true,
            });
            resolve(users);
            
        } catch (error) {
            reject(error);
        }
    })
}

let getUserInfoById = (userId) => {
    return new Promise( async (resolve, reject) => {

        try {
            let user = await db.user.findOne({
               where: { id : userId} ,
               raw : true,
            })
            if(user) {
                resolve(user);
            }
            else {
                resolve([])
            }
            
        } catch (error) {
            reject(error);
            
        }

    })
}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {

        try {
            let user  = await db.user.findOne({ 
                where : {id : data.id}
            })
            if(user) {

                user.username = data.username,
                user.email = data.email,
                user.phonenumber = data.phonenumber,

                
                await user.save();
                let allUsers  = await db.user.findAll(); 
                resolve(allUsers);

            } else{
                resolve();
            }

                
            
        } catch (error) {
            reject(error)
            
        }

    })
}

let deleteUserInfoById = (userId) => {
    return new Promise(async(resolve, reject) =>{
        // x <- y cách gán giá trị  y cho x
      //  id : id  == id : userId
        try {
            let user = await db.user.findOne({
                where: {id: userId} 
            })
            if(user){
                await user.destroy();
            }
            resolve();

            
        } catch (error) {
            reject(error)
;            
        }
    })
}






module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById : getUserInfoById,
    updateUserData : updateUserData,
    deleteUserInfoById : deleteUserInfoById,
}