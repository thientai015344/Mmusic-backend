import trackSevice from '../services/trackSevice';



let handleGetAllTrack = async(req, res) => {
    let id = req.query.id; 
    if(!id){
        return res.status(200).json({
            errCode : 1,
            errMessage :'missing required parameters',
            track:[]
        })
    }
    let track = await trackSevice.getAllTrack(id);
    return res.status(200).json({
        errCode : 0,
        errMessage :'ok',
        track
    })

}

let getCommentTrack = async (req, res) =>{
    try {
        
    let comment = await trackSevice.getCommentTrack(req.query.id);
        return res.status(200).json(comment);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode : -1,
            errMessage :'Error from sever'
        })
        
    }
}


let handleCreateNewComment = async (req, res) =>{
    let message = await trackSevice.CreateNewComment(req.body);
    return res.status(200).json(message);

}



let handleCreateNewTrack = async (req, res) =>{
    let message = await trackSevice.CreateNewTrack(req.body);
    return res.status(200).json(message);

}

let handleEditTrack = async(req, res) => {
    let data = req.body;
    let message = await trackSevice.updateTrackData(data);
    return res.status(200).json(message);
}

let handleDeleteTrack = async(req, res) => {
    if(!req.body.id){
        return res.status(200).json({
                errCode: 1,
                errMessage: 'missing required parameter !'

        })
    }
    let message = await trackSevice.deleteTrackData(req.body.id);
    return res.status(200).json(message);
}








module.exports ={
    handleGetAllTrack: handleGetAllTrack,
    handleCreateNewComment: handleCreateNewComment,
    handleCreateNewTrack: handleCreateNewTrack,
    handleEditTrack: handleEditTrack,
    handleDeleteTrack: handleDeleteTrack,
    getCommentTrack: getCommentTrack,
}