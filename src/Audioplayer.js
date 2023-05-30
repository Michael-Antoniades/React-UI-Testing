import React, {useState, useRef, useEffect} from 'react'
//useMemo?


import './Audioplayer.css';
import {IoMdSkipBackward} from 'react-icons/io'
import {IoMdSkipForward} from 'react-icons/io'
import {GrPlayFill} from 'react-icons/gr'
import {GrPauseFill} from 'react-icons/gr'
import {SongList, getNewSong} from './SongList'

//includes audioplayer functionality and all songs that are necessary to load


export function AudioPlayer(props) {


    //states
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    // const [data, setData] = useState([]);
    
    // const [songs, ] = useState([]);
    //references
    const audioPlayer = useRef(); //reference our audio component
    const progressBar = useRef(); //reference to our slider
    const animationRef = useRef(); //references animation of slider
    //const waveRef = useRef();
    
    //   function getRandomInt(min, max) {
    //     min = Math.ceil(min);
    //     max = Math.floor(max);
    //     let result = Math.floor(Math.random() * (max - min + 1) + min); //The maximum and min are inclusive
    //     return result
    //   }
    // let randint = getRandomInt(0,SongList.length-1);
    const [toggle, setToggle] = useState(true);
    const handleToggle = () => {
        setToggle(!toggle);
    };

    const calledOnce = useRef(true);
    useEffect(() => {
        if(calledOnce.current) {
            return;
        }
        if (toggle === false) {
            console.log('i only run once if toggle is false');
            calledOnce.current = true
        }
     },[toggle]);

    useEffect(()=>{
        getNewSong();
        handleToggle();
    },[]);
       


    useEffect(() => { //takes a function as its first parameter, array as second parameter function is what we want it to do
        const seconds = Math.floor(audioPlayer.current.duration);
        setDuration (seconds); //coming from variable set 1 line above ^
        progressBar.current.max = seconds;
          //current is referencing current item in our reference, max is a built in property on our input range
    }, []); //array tells us when it wants us to run use effect if we dont use this 
    //it will run every single time component refreshes, empty array only runs once.  seems like once, but problem is audio file may have not loaded
    //audioplayer exists, current exists updated when loadedmetadata is available, do same with readystate tells us when its loaded as well 

    const calculateTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const seconds = Math.floor(secs % 60);
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${returnedMinutes}:${returnedSeconds}`;
      }

    // const maxTime = (end) => {
    //     const playTime = end;
    //     return (playTime);
    // }  
    // const endSlider = (duration) => {
    //     if(duration === Number(audioPlayer.current.currentTime)) {
    //         return SkipSong;
    //     }
    //     else {
    //         return (false);
    //     }
    // }


    // const waveStart = () => {
    //     let audioElement = SongList[currentSongIndex].src;
    //     let canvasElement = document.getElementsByClassName('canvas');
    //     const ctx = canvasElement[0].getContext('2d'); 
    //     console.log(ctx)
    //     let wave = new Wave(audioElement, ctx);
    // }
    

    

    //not sure if necessary, firefox/Ios workaround attempt
    // const catchError = () => { 
    //     var playPromise = document.querySelector('audio').play();
    //     var loadPromise = document.querySelector('audio').load();
    //     if (playPromise!== undefined) {
    //         playPromise.then(_ => {
    //             playPromise();
    //         })
    //         .catch(error => {
    //            loadPromise(); 
    //         });
    //     }
    // }
//These lines are key to fixing the not playing problem after duration
//and also the skip song working properly make sure to study

//These Lines below were commented out and FIXED the problem 
//seem to work ok in current state but need to watch

    useEffect(() => {
        if(currentSongIndex === 1 && currentTime === 0){
            //catchError(); 
            audioPlayer.current.pause();
            //togglePlayPause();
            
        }
        else { 
            audioPlayer.current.play();
            //SkipSong();
            //catchError(); 
            //audioPlayer.current.pause();
        }
        }, [currentSongIndex]);
        

    const togglePlayPause = () => {
        const prevValue = isPlaying; //grabs state outside so that play button doesn't break from useffect being asyncronous
        setIsPlaying(!prevValue);

        if (!prevValue) {
            audioPlayer.current.play();
            animationRef.current = requestAnimationFrame(whilePlaying)
        }
        else {
            audioPlayer.current.pause(); 
            cancelAnimationFrame(animationRef.current);
        }   
}

const whilePlaying = () => { //these two functions could be abstracted but first line different
    progressBar.current.value = audioPlayer.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
}

const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    changePlayerCurrentTime();
}

const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`)
    setCurrentTime(progressBar.current.value);
}

//Insert songs and set them up for skipping function:

const SkipSong = (forwards = true) => {
    if (forwards) {
        setCurrentSongIndex(() => {
            let temp = currentSongIndex
            temp++;

            if (temp > SongList.length - 1) {
                temp = 0;
            }
            return temp;
        });
    } else {
        setCurrentSongIndex(() => {
            let temp = currentSongIndex;
            temp--;

            if (temp < 0) {
                temp = SongList.length - 1;
            }

            return temp;
        });
    }
}

const backSong = (backwards = true) => {
    if (backwards) {
        setCurrentSongIndex(() => {
            let temp = currentSongIndex
            temp--;

            if (temp < 0) {
                temp = SongList.length-1;
            }
            return temp;
        });
    } else {
        setCurrentSongIndex(() => {
            let temp = currentSongIndex;
            temp++;

            if (temp < 0) {
                temp = SongList.length - 1;
            }

            return temp;
        });
    }
}

let currentURL = window.location.href;

function URLChecker() {
    if (currentURL.includes('/beats')) {
        return true;
    }
    else {
        return false;
    }
}

// let location = useLocation();
let location = 'potato';


useEffect(() => { //function checks everytime we want to see if we want to go to the next song, or navigated pages to un-render audioplayer
    if ( calculateTime(currentTime) === calculateTime(duration)) {
        SkipSong(true);  
    } else {
        if ( URLChecker() ){
            audioPlayer.current.pause();
        }
    }
   //current is referencing current item in our reference, max is a built in property on our input range
}, [location, currentTime]);
    

    return (
        <div className = "Audioplayer">
            <audio src = {SongList[currentSongIndex].src} ref = {audioPlayer} preload = "metadata" >
            </audio>
                {/* modification for api for s3 file storage access: */}
                {/* <div>
                <a href = 'http://localhost:8080/DownloadS3Objects' value = "Display">downloadobjects</a>
                <a href = 'http://localhost:8080/checkIfFolderExists' value = "Display">check folder</a>
                </div> */}
            <div className ="songPhotoContainer">
                <img className ="songPhoto" src = {SongList[currentSongIndex].img_src} >
                </img>  

                <img className ="songPhoto s3" src = {SongList[1].img_src} >
                </img>  


            </div> 

            <div className = "currentlyPlaying" >
                            Now Playing: 
            <br />
                        {SongList[currentSongIndex].title}
            <br/>
            </div>

            <button className = "forwardbackward" onClick = {()=> { backSong(); setIsPlaying(true); }} > 
            <IoMdSkipBackward/>  
            
            </button>
            
            <button onClick ={togglePlayPause} className = "playpause"  > 
            { isPlaying?  <GrPauseFill className = "pause" /> : <GrPlayFill className = "play" /> } 
            
            </button>

            <button className = "forwardbackward" onClick = {()=> { SkipSong(); setIsPlaying(true) }}  > 
                <IoMdSkipForward/>
            </button> 
            
            <input type = "range" className = "progressbar" defaultValue = "0" ref = {progressBar} onChange = {changeRange} />

            <div className = "currenttime" > 
            {calculateTime(currentTime)} 
            </div>

            <div className = "duration" > 
            {(duration && !isNaN(duration)) && calculateTime(duration)}


            
            </div>
















        </div>

    )
}

export default AudioPlayer;