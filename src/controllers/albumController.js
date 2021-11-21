import AlbumSevice from '../services/abumSevice';



let handleGetAllAlbum = async(req, res) => {
    let id = req.query.id; 
    if(!id){
        return res.status(200).json({
            errCode : 1,
            errMessage :'missing required parameters',
            singer:[]
        })
    }
    let album = await AlbumSevice.getAllAlbum(id);
    return res.status(200).json({
        errCode : 0,
        errMessage :'ok',
        album
    })

}


let handleGetDetailAlbum = async(req, res) => {
    try {
            let info = await AlbumSevice.handleGetDetailAlbumById(req.query.id)
            return res.status(200).json(
                info
            )
        
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



let handleCreateNewAlbum = async (req, res) =>{
    let message = await AlbumSevice.CreateNewAlbum(req.body);
    return res.status(200).json(message);

}

let handleEditAlbum = async(req, res) => {
    let data = req.body;
    let message = await AlbumSevice.updateAlbumData(data);
    return res.status(200).json(message);
}

let handleDeleteAlbum = async(req, res) => {
    if(!req.body.id){
        return res.status(200).json({
                errCode: 1,
                errMessage: 'missing required parameter !'

        })
    }
    let message = await AlbumSevice.deleteAlbumData(req.body.id);
    return res.status(200).json(message);
}







module.exports ={
    handleGetAllAlbum: handleGetAllAlbum,
    handleCreateNewAlbum: handleCreateNewAlbum,
    handleEditAlbum: handleEditAlbum,
    handleDeleteAlbum: handleDeleteAlbum,
    handleGetDetailAlbum: handleGetDetailAlbum,
}