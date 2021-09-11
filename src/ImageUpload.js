import React, {useState} from 'react';
import {Button} from '@material-ui/core';
import firebase from "firebase";
import {storage, db} from './firebase';
import './imageUpload.css';



function ImageUpload({username}) {
    const [caption, setCaption]=useState('');
    //이미지 파일선택
    const [image, setImage]=useState(null);
    //진행바 표시
    const [progress, setProgress]=useState(0);

    
    const handleChange=(e)=>{
        if(e.target.files[0]){ //파일을 가져오라는 것
            setImage(e.target.files[0]); //이미지를 그 상태로 저장하라는 것
        }
    };

    const handleUpload=()=>{ //이미지를 넣어 경로를 잡음
        const uploadTask=storage.ref(`images/${image.name}`).put(image);

        uploadTask.on( //상태가 변경되었다는 것을 알려줌
            "state_changed",
            (snapshot)=>{
                // 막대 진행바...
                const progress=Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) *100
                );
                setProgress(progress);
            },
            (error)=>{
                // 에러발생시
                console.log(error);
                alert(error.message);
            },
            ()=>{
                // 이미지 업로드 완료시
                storage
                .ref("images")
                .child(image.name)
                .getDownloadURL()
                .then(url=>{
                    // db 내부 이미지 post
                    db.collection("posts").add({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        caption: caption,
                        imageUrl: url, // 이미지 다운로드 링크를 넣음
                        username: username
                    });

                    // 재설정
                    setProgress(0);
                    setCaption("");
                    setImage(null);
                })
            }
        )
    }


    return (
        <div className="imageupload">
            {/* I want to have */}
            {/* Caption input */}
            {/* File picker */}
            {/* Post button */}
            <progress className="imageupload_progress" value={progress} max="100" />
            <input type="text" placeholder="Enter a cation.." onChange={event=>setCaption(event.target.value)} value={caption}/>
            <input type="file" onChange={handleChange} />
            <Button onClick={handleUpload}>Upload</Button>
        </div>
    )
}

export default ImageUpload
