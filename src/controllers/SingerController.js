import SINGERSevice from '../services/SINGERSevice';








let handleGetAllSinger = async(req, res) => {
    let id = req.query.id; 
    if(!id){
        return res.status(200).json({
            errCode : 1,
            errMessage :'missing required parameters',
            singer:[]
        })
    }
    let singer = await SINGERSevice.getAllSINGER(id);
    return res.status(200).json({
        errCode : 0,
        errMessage :'ok',
        singer
    })

}

let handleGetAllSingerForTrack = async(req, res) => {
    let id = req.query.id; 
    if(!id){
        return res.status(200).json({
            
            errCode : 1,
            errMessage :'missing required parameters',
            singer:[]
        })
    }
    let singer = await SINGERSevice.getAllSingerForTrack(id);
    return res.status(200).json({
        errCode : 0,
        errMessage :'ok',
        singer
    })

}


let handleCreateNewSinger = async (req, res) =>{
    let message = await SINGERSevice.CreateNewSinger(req.body);
    return res.status(200).json(message);

}

let handleEditSinger = async(req, res) => {
    let data = req.body;
    let message = await SINGERSevice.updateSingerData(data);
    return res.status(200).json(message);
}

let handleDeleteSinger = async(req, res) => {
    if(!req.body.id){
        return res.status(200).json({
                errCode: 1,
                errMessage: 'missing required parameter !'

        })
    }
    let message = await SINGERSevice.deleteSingerData(req.body.id);
    return res.status(200).json(message);
}

let handleGetDetailSinger = async(req, res) => {
    try {
            let track = await SINGERSevice.handleGetDetailSinger(req.query.id)
            return res.status(200).json({
                     errCode : 0,
                    errMessage :'ok',
                    track
            })
 
    } catch (error) {
        console.log(error)
        return res.status(200).json(
            {
                errCode : -1,
                errMessage :'Error from the server'
                
            }
        )
        
    }
}







module.exports ={
    handleGetAllSinger: handleGetAllSinger,
    handleGetAllSingerForTrack: handleGetAllSingerForTrack,
    handleCreateNewSinger: handleCreateNewSinger,
    handleEditSinger: handleEditSinger,
    handleDeleteSinger: handleDeleteSinger,
    handleGetDetailSinger: handleGetDetailSinger,
}