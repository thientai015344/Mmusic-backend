import db from '../models'



let checkSingername = (singername) => {
    return new Promise(async(resolve, reject) =>{
        try {
            let singer = await db.singers.findOne({
              where: { singername: singername}
            })
            if(singer){
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


let CreateNewSinger = (data) =>{
    return new Promise(async(resolve, reject) =>{
        try {
            let check = await checkSingername(data.singername);
            if(check==true){
                
                resolve({
                    errCode : 1, 
                    errMessage: 'Singer đã tồn tại !'
                })
                
            }else{
                
                await db.singers.create({
    
                    singername: data.singername,
                    description: data.description,
                    avatasinger: data.avatasinger,

                })
    
                resolve({
                    errCode :0 ,
                    message : 'create succeed!'
    
                })
            }
        } catch (error) {
        reject (error); 
            
        }
    })
}


let getAllSINGER = (singerId) => {

    return new Promise(async(resolve, reject) =>{
        try {
            let singers = '';
            if(singerId === 'ALL') {
                singers = await db.singers.findAll({
                });        
            }           
            if(singerId && singerId !== 'ALL') {
                singers = await db.singers.findOne({
                    where:{id : singerId},                   
                })                  
            }
            resolve(singers);      
        } catch (error) {
            reject(error);     
        }
    })
    
}

let updateSingerData  = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            if(!data.id){
                resolve({ 
                    errCode: 2,
                    errMessage:'missing required data'
                })
            }
            let singer  = await db.singers.findOne({ 
                where : {id : data.id},
                raw : false
            })
            if(singer) {
                singer.singername = data.singername,
                singer.description = data.description,
                singer.avatasinger = data.avatasinger,
                await singer.save();
                // singername: data.singername,
                // description: data.description,
                // avatasinger: data.avatasinger,
               // });
                resolve({
                    errCode: 0,
                    message:'updata successfully',
                })
               
            } else{
                resolve(
                    {
                        errCode: 1,
                        errMessage: `singer's not found`
                    }
                );
            }

            
        } catch (error) {
            reject(error);
            
        }
    })

}


let deleteSingerData = (id) => {
    return new Promise(async(resolve, reject) => {
        let singer = await db.singers.findOne({
            where: { id: id}
        })
        if(!singer){
            resolve ({ 
                errCode: 2,
                errMessage : `The singer isn't exist`
            })
        }
       // awaxit singer.destroy();
       await db.singers.destroy({
           where: { id: id}
       });
        
        resolve({ 
            errCode: 0,
            message : `delete successfully'`


        })

        
    })

}


module.exports = {
   
    getAllSINGER: getAllSINGER,
    CreateNewSinger: CreateNewSinger,
    updateSingerData: updateSingerData,
    deleteSingerData: deleteSingerData,
    
}