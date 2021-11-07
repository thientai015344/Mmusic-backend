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





module.exports = {
   
    getAllSINGER: getAllSINGER,
    CreateNewSinger: CreateNewSinger,

    
}