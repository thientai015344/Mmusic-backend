import db from '../models'

// singername: DataTypes.STRING,
//     description: DataTypes.TEXT,
//     avatasinger: DataTypes.BLOB('long'),

let createNewSinger = async (data) => {
    return new Promise(async(resolve, reject) => {
        try {
           
            await db.singers.create({

                singername: data.singername,
                description: data.description,
                avatasinger: data.avatasinger,
           
            })


            resolve(' create new user succeed!')
           
        } catch (error) {
            reject(error);
            
        }

    })
 

    
}









module.exports = {
    createNewSinger: createNewSinger,
    
}