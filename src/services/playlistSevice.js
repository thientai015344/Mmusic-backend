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
                    errMessage: 'Singer đã tồn tại !'
                })
                
            }else{
                
                await db.playlists.create({
    
                    playlistname: data.playlistname,
                    // description: data.description,
                    // avataplaylist: data.avataplaylist,

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


let getAllPlaylist = (playlistId) => {

    return new Promise(async(resolve, reject) =>{
        try {
            let playlists = '';
            if(playlistId === 'ALL') {
                playlists = await db.playlists.findAll({
                });        
            }           
            if(playlistId && playlistId !== 'ALL') {
                playlists = await db.playlists.findOne({
                    where:{id : playlistId},                   
                })                  
            }
            resolve(playlists);      
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
                // playlist.description = data.description,
                // playlist.avataplaylist = data.avataplaylist,
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


module.exports = {
   
    getAllPlaylist: getAllPlaylist,
    CreateNewPlaylist:  CreateNewPlaylist,
    updatePlaylistData: updatePlaylistData,
    deletePlaylistData: deletePlaylistData,
    
}