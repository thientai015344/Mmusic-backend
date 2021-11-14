import PlaylistSevice from '../services/playlistSevice';



let handleGetAllPlaylist = async(req, res) => {
    let id = req.query.id; 
    if(!id){
        return res.status(200).json({
            errCode : 1,
            errMessage :'missing required parameters',
            singer:[]
        })
    }
    let playlist = await PlaylistSevice.getAllPlaylist(id);
    return res.status(200).json({
        errCode : 0,
        errMessage :'ok',
        playlist
    })

}

let handleCreateNewPlaylist = async (req, res) =>{
    let message = await PlaylistSevice.CreateNewPlaylist(req.body);
    return res.status(200).json(message);

}

let handleEditPlaylist = async(req, res) => {
    let data = req.body;
    let message = await PlaylistSevice.updatePlaylistData(data);
    return res.status(200).json(message);
}

let handleDeletePlaylist = async(req, res) => {
    if(!req.body.id){
        return res.status(200).json({
                errCode: 1,
                errMessage: 'missing required parameter !'

        })
    }
    let message = await PlaylistSevice.deletePlaylistData(req.body.id);
    return res.status(200).json(message);
}







module.exports ={
    handleGetAllPlaylist: handleGetAllPlaylist,
    handleCreateNewPlaylist: handleCreateNewPlaylist,
    handleEditPlaylist: handleEditPlaylist,
    handleDeletePlaylist: handleDeletePlaylist,
}