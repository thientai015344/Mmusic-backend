import db from '../models'



let checkPlaylistname = (playlistname) => {
    return new Promise(async(resolve, reject) =>{
        try {
            let playlist = await db.playlists.findOne({
              where: { playlistname: playlistname}
            })
            if(playlist){
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


let CreateNewPlaylist = (data) =>{
    return new Promise(async(resolve, reject) =>{
        try {
            let check = await checkPlaylistname(data.playlistname);
            if(check==true){
                
                resolve({
                    errCode : 1, 
                    errMessage: 'playlistname đã tồn tại !'
                })
                
            }else{
                
                await db.playlists.create({
    
                   
                    playlistname : data.playlistname,
                    imgplaylist : data.imgplaylist,
                    userId : data.userId,
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



let getAllPlaylist =(inputId) => {
    return new Promise(async(resolve, reject) => {
        try {
            

            if(!inputId){
                resolve({
                    error: 1,
                    errMessage:' missing required parameter'
                })
            }
            else {
                let data = await db.user.findAll({

                    where:{
                        id : inputId
                    },  
                    actributes : ['username']
                    , 
                    include: [
                        {model: db.playlists, actributes : ['id', 'playlistname', 'imgplaylist']  } 

                     ],
                     raw: true,
                     nest: true,  
                })
                resolve({
                    errCode: 0,
                    data: data
                })
            }
            
        } catch (error) {

            reject(error);
            
        }
    })
}

let handleGetAllPlaylistForDetail =(inputId) => {
    return new Promise(async(resolve, reject) => {
        try {
            

            if(!inputId){
                resolve({
                    error: 1,
                    errMessage:' missing required parameter'
                })
            }
            else {
                let data = await db.playlists.findOne({

                    where:{
                        id : inputId
                    }, 
                    include: [
                        {model: db.user, } 

                     ],
                 
                     raw: true,
                     nest: true,  
                })
                resolve({
                    errCode: 0,
                    data: data
                })
            }
            
        } catch (error) {

            reject(error);
            
        }
    })
}


let updatePlaylistData  = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            if(!data.id){
                resolve({ 
                    errCode: 2,
                    errMessage:'missing required data'
                })
            }
            let playlist  = await db.playlists.findOne({ 
                where : {id : data.id},
                raw : false
            })
            if(playlist) {
                playlist.playlistname = data.playlistname,
                 playlist.imgplaylist = data.imgplaylist,

                await playlist.save();
                // playlistname: data.playlistname,
                // description: data.description,
                // avataplaylist: data.avataplaylist,
               // });
                resolve({
                    errCode: 0,
                    message:'updata successfully',
                })
               
            } else{
                resolve(
                    {
                        errCode: 1,
                        errMessage: `playlist's not found`
                    }
                );
            }

            
        } catch (error) {
            reject(error);
            
        }
    })

}


let deletePlaylistData = (id) => {
    return new Promise(async(resolve, reject) => {
        let playlist = await db.playlists.findOne({
            where: { id: id}
        })
        if(!playlist){
            resolve ({ 
                errCode: 2,
                errMessage : `The playlist isn't exist`
            })
        }
       // awaxit playlist.destroy();
       await db.playlists.destroy({
           where: { id: id}
       });
        
        resolve({ 
            errCode: 0,
            message : `delete successfully'`


        })

        
    })

}



let handleAddTrackPlaylist = (data) =>{

    return new Promise(async(resolve, reject) =>{

        try {
            
            if(data){
                
                await db.playlisttracks.create({  
                    trackId  : data.trackId,
                    playlistId: data.playlistId,
                }, 
                )
    
                resolve({
                    errCode :0 ,
                    message : 'create succeed!'
    
                })

            }
            
        }catch (error) {
        reject (error); 
            
        }
    })
}


let handleAddTracklibrytracks = (data) =>{

    return new Promise(async(resolve, reject) =>{

        try {
            
            if(data){
                
                await db.librytracks.create({  
                    trackId  : data.trackId,
                    userId: data.userId,
                }, 
                )
    
                resolve({
                    errCode :0 ,
                    message : 'create succeed!'
    
                })

            }
            
        }catch (error) {
        reject (error); 
            
        }
    })
}


let handleGetDetailPlaylist = (playlistId) => {
    return new Promise(async(resolve, reject) => {
        try {

            if(!playlistId){
                resolve({ 
                    error: 1,
                    errMessage : 'missing parameter + ' + playlistId
                })
            }
            else {
                let detailPlaylist = await db.playlists.findAll({
                    where: { id : playlistId },
                  
                    include: [
                       {model: db.playlisttracks, include :[{model: db.tracks ,include: [db.singers]}]}
                    ],
                    raw: true,
                    nest: true,
                })

                resolve(detailPlaylist) 
            }
        
        } catch (error) {
            console.log(error)
            
        }
    })
}


let handleGetAlllibrytracks = (userId) => {
    return new Promise(async(resolve, reject) => {
        try {

            if(!userId){
                resolve({ 
                    error: 1,
                    errMessage : 'missing parameter + ' + userId
                })
            }
            else {
                let detailPlaylist = await db.user.findAll({
                    where: { id : userId },
                    
                    include: [
                        {model: db.librytracks, include :[{model: db.tracks ,include: [db.singers]}]}
                    ],
                    raw: true,
                    nest: true,
                })

                resolve(detailPlaylist) 
            }
        
        } catch (error) {
            reject(error)
            
        }
    })
}



let handleDeletelibrytracks = (id) => {
    return new Promise(async(resolve, reject) => {
        let playlist = await db.librytracks.findOne({
            where: { id: id}
        })
        if(!playlist){
            resolve ({ 
                errCode: 2,
                errMessage : `The playlist isn't exist`
            })
        }
       // awaxit playlist.destroy();
       await db.librytracks.destroy({
           where: { id: id}
       });
        
        resolve({ 
            errCode: 0,
            message : `delete successfully'`


        })

        
    })

}


module.exports = {
   
    getAllPlaylist: getAllPlaylist,
    CreateNewPlaylist:  CreateNewPlaylist,
    updatePlaylistData: updatePlaylistData,
    deletePlaylistData: deletePlaylistData,
    handleAddTrackPlaylist:handleAddTrackPlaylist,
    handleAddTracklibrytracks: handleAddTracklibrytracks,
    handleGetDetailPlaylist: handleGetDetailPlaylist,
    handleGetAlllibrytracks: handleGetAlllibrytracks,
    handleDeletelibrytracks: handleDeletelibrytracks,
    handleGetAllPlaylistForDetail: handleGetAllPlaylistForDetail,
    
}