import db from '../models'



let checkTrackname= (namesong) => {
    return new Promise(async(resolve, reject) =>{
        try {
            let track = await db.tracks.findOne({
              where: { namesong: namesong}
            })
            if(track){
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


let CreateNewTrack = (data) =>{
    return new Promise(async(resolve, reject) =>{
        try {
            let check = await checkTrackname(data.namesong);
            if(check==true){
                
                resolve({
                    errCode : 1, 
                    errMessage: 'Track đã tồn tại !'
                })
                
            }else{
                
                await db.tracks.create({
    
                    namesong: data.namesong,
                    imgsong: data.imgsong,
                    filetrack: data.filetrack,
                    duration: data.duration,
                    SingerID: data.SingerID,
                    lyric: data.lyric,
                    listen: data.listen,
                

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


let getAllTrack = (trackId) => {

    return new Promise(async(resolve, reject) =>{
        try {
            let tracks = '';
            if(trackId === 'ALL') {
                tracks = await db.tracks.findAll({
                    
                    include: [
                        {model: db.singers , actributes:['singername'] 
                        }
                     ],
                     raw: true,
                     nest: true,    
                });        
            }           
            if(trackId && trackId !== 'ALL') {
                tracks = await db.tracks.findOne({
                    where:{id : trackId},  

                    include: [
                        {model: db.singers , actributes:['singername'] 
                        }
                     ],
                     raw: true,
                     nest: true,                 
                })                  
            }
            resolve(tracks);      
        } catch (error) {
            reject(error);     
        }
    })
    
}

let updateTrackData  = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            if(!data.id){
                resolve({ 
                    errCode: 2,
                    errMessage:'missing required data'
                })
            }
            let track  = await db.tracks.findOne({ 
                where : {id : data.id},
                raw : false
            })
            if(track) {
                track.namesong = data.namesong,
                track.imgsong = data.imgsong,
                track.filetrack = data.filetrack,
                await track.save();
                // NameSong: data.NameSong,
                // imgsong: data.imgsong,
                // filetrack: data.filetrack,
               // });
                resolve({
                    errCode: 0,
                    message:'updata successfully',
                })
               
            } else{
                resolve(
                    {
                        errCode: 1,
                        errMessage: `track's not found`
                    }
                );
            }

            
        } catch (error) {
            reject(error);
            
        }
    })

}


let deleteTrackData = (id) => {
    return new Promise(async(resolve, reject) => {
        let track = await db.tracks.findOne({
            where: { id: id}
        })
        if(!track){
            resolve ({ 
                errCode: 2,
                errMessage : `The track isn't exist`
            })
        }
       // awaxit track.destroy();
       await db.tracks.destroy({
           where: { id: id}
       });
        
        resolve({ 
            errCode: 0,
            message : `delete successfully'`


        })

        
    })

}


module.exports = {
   
    getAllTrack: getAllTrack,
    CreateNewTrack:  CreateNewTrack,
    updateTrackData: updateTrackData,
    deleteTrackData: deleteTrackData,
    
}