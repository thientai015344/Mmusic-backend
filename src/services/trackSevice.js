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
                    singerId: data.SingerID,
                    lyric: data.lyric,
                    listen: data.listen,   
                    
                }, 
                )
    
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
                        { model: db.singers , actributes:['singername'] }
                        
                     ],
                     raw: true,
                     nest: true,    
                });        
            }           
            if(trackId && trackId !== 'ALL') {
                tracks = await db.tracks.findOne({
                    where:{id : trackId},  

                    include: [
                        {model: db.singers , actributes:['singername'] } 

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
                track.duration = data.duration
                track.lyric = data.lyric
                await track.save();
                
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


let CreateNewComment = (data) =>{

    return new Promise(async(resolve, reject) =>{

        try {
            
            if(data){
                
                await db.comments.create({
                    userId : data.userId,
                    contentcmt : data.contentcmt,
                    trackId  : data.trackId
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


let getCommentTrack =(inputId) => {
    return new Promise(async(resolve, reject) => {
        try {
            

            if(!inputId){
                resolve({
                    error: 1,
                    errMessage:' missing required parameter'
                })
            }
            else {
                let data = await db.tracks .findAll({

                    where:{
                        id : inputId
                    },  
                    actributes : ['namesong']
                    , 
                    include: [
                        {model: db.comments,  include: [db.user] } 

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







module.exports = {
   
    getAllTrack: getAllTrack,
    CreateNewTrack:  CreateNewTrack,
    updateTrackData: updateTrackData,
    deleteTrackData: deleteTrackData,
    CreateNewComment: CreateNewComment,
    getCommentTrack: getCommentTrack,
    
}