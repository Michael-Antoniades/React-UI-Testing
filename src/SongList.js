//Accessing Files from S3 Storage Logic:
//import React, {useState, useRef, useEffect} from 'react'
// import axios from "axios"
// import React, { useEffect, useRef, useLocation } from 'react';
//const PF = "http://localhost:8080/DownloadS3Objects";

export const getNewSong = async () => {

    // try {
    // const res = await axios.get(PF, {
    // })  .then(res => {
    //     console.log(res);
    // })
    // .catch(error => {
    //     console.log(error);


    // });
    // } catch (err) {
    //     console.error(err)
    // }
}

export const SongList = [

    {
    title: "Table for Humina",
    artist: "Toni",
    img_src: "../images/humina.jpg",
    src: "../beats/tableforhumina prod.mp3",
    mood: "Rebellious",
    time: "4:02"
    }        ,

    {
    title: "Trapavelli",
    artist: "Toni",
    img_src: "../images/ig88.jfif",
    src: "../beats/trapavelliprod1.mp3",
    mood: "Enraged",
    time: "2:24"
    },
    {
    title: "Delta Ave",
    artist: "Toni",
    img_src: "../images/hoh.jpg",
    src: "https://nextdaybeats.s3.us-east-2.amazonaws.com/johngotti18%40mail.com/ReachAround%20f.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAXJX4Z5ZVEKW6GBV2%2F20230423%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20230423T181920Z&X-Amz-Expires=3600&X-Amz-Signature=a690adf5b5df5195659118942be083c0f479e8dd700f8edeffb159a7a3ff37cd&X-Amz-SignedHeaders=host&x-id=GetObject",
    mood: "Crunk",
    time: "2:30"
    }
]

export default {
        SongList,
        getNewSong
}
