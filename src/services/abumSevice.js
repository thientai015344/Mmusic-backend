
import db from '../models'



let checkAlbumname = (nameAlbum) => {
    return new Promise(async(resolve, reject) =>{
        try {
            let album = await db.albums.findOne({
              where: { nameAlbum: nameAlbum}
            })
            if(album){
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


let CreateNewAlbum= (data) =>{

    return new Promise(async(resolve, reject) =>{
        try {
            let check = await checkAlbumname(data.nameAlbum);
            if(check==true){
                
                resolve({
                    errCode : 1, 
                    errMessage: 'Album đã tồn tại !'
                })
                
            }else{
                
                await db.albums.create({
    
                    nameAlbum: data.nameAlbum,
                    imgAlbum: data.imgalbum,
                    // avataalbum: data.avataalbum,

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


let getAllAlbum = (albumId) => {

    return new Promise(async(resolve, reject) =>{
        try {
            let albums = '';
            if(albumId === 'ALL') {
                albums = await db.albums.findAll({
                });        
            }           
            if(albumId && albumId !== 'ALL') {
                albums = await db.albums.findOne({
                    where:{id : albumId},                   
                })                  
            }
            resolve(albums);      
        } catch (error) {
            reject(error);     
        }
    })
    
}


let handleGetDetailAlbumById = (albumId) => {
    return new Promise(async(resolve, reject) => {
        try {

            if(!albumId){
                resolve({ 
                    error: 1,
                    errMessage : 'missing parameter + ' + albumId
                })
            }
            else {
                let detailAlbum = await db.albums.findAll({
                    where: { id : albumId },
                  
                    include: [
                       {model: db.albumtracks, include :[{model: db.tracks ,include: [db.singers]}]}
                    ],
                    raw: true,
                    nest: true,
                })

                resolve(detailAlbum) 
            }
        
        } catch (error) {
            console.log(error)
            
        }
    })
}



let updateAlbumData  = (data) => {

    return new Promise(async(resolve, reject) => {
        try {
            if(!data.id){
                resolve({ 
                    errCode: 2,
                    errMessage:'missing required data'
                })
            }
            let album  = await db.albums.findOne({ 
                where : {id : data.id},
                raw : false
            })
            if(album) {
                album.nameAlbum = data.nameAlbum,
                album.imgAlbum = data.imgalbum
               
                await album.save();
               
                resolve({
                    errCode: 0,
                    message:'updata successfully',
                })
               
            } else{
                resolve(
                    {
                        errCode: 1,
                        errMessage: `album's not found`
                    }
                );
            }

            
        } catch (error) {
            reject(error);
            
        }
    })

}


let deleteAlbumData = (id) => {
    return new Promise(async(resolve, reject) => {
        let album = await db.albums.findOne({
            where: { id: id}
        })
        if(!album){
            resolve ({ 
                errCode: 2,
                errMessage : `The album isn't exist`
            })
        }
       // awaxit album.destroy();
       await db.albums.destroy({
           where: { id: id}
       });
        
        resolve({ 
            errCode: 0,
            message : `delete successfully'`


        })

        
    })

}




    let addTrackForAlbum = (data) =>{
           
        return new Promise(async(resolve, reject) =>{
    
            try {
                if(!data.albumHasTrack){
                    resolve({ 
                        errCode: 1,
                        message : `missing required pramate'`
                    })
                }else{
                    let tracss = data.albumHasTrack
                    if(tracss && tracss.length >0){

                        tracss = tracss.map(item =>{
                            return item;
                        })

                    }
                    await db.albumtracks.bulkCreate(tracss)
                }
    
                
                
            }catch (error) {
            reject (error); 
                
            }
        })
    }














module.exports = {
   
    getAllAlbum: getAllAlbum,
    CreateNewAlbum:  CreateNewAlbum,
    updateAlbumData: updateAlbumData,
    deleteAlbumData: deleteAlbumData,
    addTrackForAlbum : addTrackForAlbum,
    handleGetDetailAlbumById: handleGetDetailAlbumById,
    
}