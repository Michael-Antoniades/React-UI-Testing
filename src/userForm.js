import React, { useState, useRef } from 'react';

import './userForm.css'

function userForm() {

    const trackRef = useRef();
    const artistRef = useRef();
    const tagRef = useRef();
    const genreRef = useRef();
    const audioRef = useRef();
    const imageRef = useRef();
    
    const [title,setTitle] = useState(null);
    const [artist,setArtist] = useState(null);
    const [tag,setTag] = useState(null);
    const [genre,setGenre] = useState(null);
    const [songFile, setSongFile] = useState(null);
    const [imgFile, setImgFile] = useState(null);
    const [bpm, setBPM] = useState(null);
    const [scale, setScale] = useState(null);
    const [status, setStatus] = useState(undefined);
    
    
    //const {user, dispatch} = useContext(Context);
    
    //The server URI we want to send our post data to
    const PF = "http://localhost:8080/upload";
    const json = JSON.parse(sessionStorage.getItem("value"));
    const _token = json._token;
    
    const value = JSON.parse(sessionStorage.getItem("value"));
    const artist_name = value.nickname;
    const linking_id = value.sub;
    const auth_token = value._token
    
                   // axios.post('http://localhost:8080/tokenVerifyTest' , {
                //     headers: {
                //         'content-type': 'text/json',
                //         '_token' : _token
                //     }    
                // })
                // .then(res => {
                //     console.log(res);
                // })
                // .catch(error => {
                //     console.log("TokenVerifyFailure")
                //})
    
    const handleSubmit = async (e) => {
            e.preventDefault();
    
            const data = new FormData();
    
            data.append('songUpload', songFile);
            data.append('imageUpload', imgFile);
            data.append('tag', tag);
            data.append('genre',genre);
            data.append('artist', artist_name);
            data.append('title', title);
            data.append('bpm', bpm);
            data.append('scale', scale);
           // data.append('songFile', songFile.name)
          //  data.append('imgFile', imgFile.name)
            
        if (songFile && imgFile && title && artist && tag) {
            try {
                setStatus({type: 'success'})
                for (var pair of data) {
                    console.log(pair[0]+ ', ' + pair[1]); 
                }
                await axios.post(PF, data,
                    {headers: {
                        'content-type': 'multipart/form-data',
                        '_token':_token
                    }}
                )
    
        
    
            } catch (err) {
                setStatus({type: 'error' , err });
            }
        }
        else {
            setStatus({type: 'error'});
            console.log(linking_id);
            console.log(artist_name);
            console.log(auth_token);
    
        }    
    }
    
        return(
    
                <div className = 'uploadMenu'>
                    {/* action = "../../post" method = "post" */}
                    <h1 class = "uploadTitle"> Track Info: </h1>
                
                <form className = "uploadForm" enctype = "multipart/form-data" 
                        //action = "/upload" method = "POST"
                        > 
                    <div class = "fieldContainer">
                        <label className = "newTrack"> Title* </label>
                            <br></br>
                        <input 
                        type = "text"
                        className = "trackInput"
                        placeholder = "New Track"
                        ref = {trackRef}
                        onChange = {e=>setTitle(e.target.value)}
                        name = "fileUpload"
                        value = {title}
                        />    
                            <br></br>
    
                        <label className = "newTrack"> Artist* </label>
                            <br></br>
                        <input 
                        type = "text"
                        className = "artistInput"
                        placeholder = "Artist Name"
                        ref = {artistRef}
                        name = "fileUpload" 
                        onChange = {e=>setArtist(e.target.value)}
                        value = {artist}
                        />    
                            <br></br>
    
                        <label className = "newTrack"> Tags* </label>
                            <br></br>
                        <input 
                        type = "text"
                        className = "tagInput"
                        placeholder = "One word description"
                        ref = {tagRef}
                        name = "fileUpload" 
                        onChange = {e=>setTag(e.target.value)}
                        value = {tag}   
                        />    
                            <br></br>
    
                        <label className = "newTrack"> Genre* </label>
                        <br></br>
                        <input 
                        type = "text"
                        className = "genreInput"
                        placeholder = "genredropdown"
                        ref = {genreRef}
                        name = "fileUpload" 
                        onChange = {e=>setGenre(e.target.value)}
                        value = {genre}   
                        />    
                            <br></br>
                            <label className = "newTrack"> BPM </label>
                            <br></br>
                        <input 
                        type = "number"
                        className = "bpmInput"
                        placeholder = "Number, how fast your head bobs"
                        
                        name = "fileUpload" 
                        onChange = {e=>setBPM(e.target.value)}
                        value = {bpm}   
                        />    
                            <br></br>
                            <label className = "newTrack"> Scale of Beat </label>
                            <br></br>
                        <input 
                        type = "text"
                        className = "scaleInput"
                        placeholder = "e.g. G major"
                        
                        name = "fileUpload" 
                        onChange = {e=>setScale(e.target.value)}
                        value = {scale}   
                        />    
                            <br></br>
                    </div>
    
                    <div class = "fileContainer">
                    <div class = "songInput"> Mp3/Wav File For Upload* 
                    <br/>
                    <br/>
                    <ImFileMusic  size = {90}/>
                    <br/>
                    <br/>
                    <input 
                    accept="audio/*" 
                    id="musicUpload"
                    type="file" 
                    ref = {audioRef}
                    onChange = {(e) => setSongFile(e.target.files[0])}
                    name = "fileUpload"
                    />
                    </div>
                    
                    <div class = "imgInput"> jpg/jpeg/png for Upload*
                    <br/>
                    <br/>
                    <ImImage aria-label = "upload image" class = "imgHolder" size = {90}/>
                    <br/>
                    <br/>
                    <input 
                    accept="image/*" 
                    action = "/upload"
                    id="fileUpload"
                    type="file" 
                    ref = {imageRef} 
                    name = "imgUpload"
                    onChange = {(e) => setImgFile(e.target.files[0])}
                     />
                    </div>
                   
                    </div>
                <button class = "uploadButton" type = "submit" onClick = {handleSubmit}> + Upload </button>
                {status?.type === 'success' && <p> Successful Upload!</p>}
                {status?.type === 'error' && (
                    <p> Unsuccessful Upload, make sure to fill out all fields </p>
                )}
                </form>
                </div> 
    
            );
    }
    

export default userForm;