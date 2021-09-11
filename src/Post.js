import React, {useState, useEffect} from 'react';
import './Post.css';
import {db} from './firebase';
import Avatar from "@material-ui/core/Avatar";
import firebase from 'firebase';



//username: 게시물을 작성한 사람
//user: 현재 로그인 한 사람
function Post({postId, user, username, caption, imageUrl}) {
    //댓글
    const [comments, setComments]=useState([]);
    const [comment, setComment]=useState('');
    
    // firebase에서 comments 부분 접근 -> 댓글추가
    // 특정 게시물 내부에 comment로 댓글이 추가됨 (=중첩목록)
    useEffect(() => {
        let unsubscribe;
        if(postId){
            unsubscribe=db
                .collection("posts")
                .doc(postId)
                .collection("comments")
                .orderBy('timestamp', 'desc')
                .onSnapshot((snapshot)=>{
                    setComments(snapshot.docs.map((doc)=>doc.data()));
                });
        }

        return ()=>{
            unsubscribe();
        };
    }, [postId]); //내부 변수 postId가 변경되면 다시 실행됨


    // 댓글버튼
    const postComment =(event)=>{
        event.preventDefault();
            
        db.collection("posts").doc(postId).collection("comments").add({
            text: comment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        setComment('');
    }



    return (
        <div className="post">

            {/* header -> avater + username */}
            <div className="post__header">
                <Avatar
                    className="post__avater" alt="RafehQazi"
                    src="/static/images/avater/1.png" />
                <h3>{username}</h3>
            </div>

            {/* image */}
            <img className="post__image" src={imageUrl} alt="" />
            

            {/* username + caption */}
            <h4 className="post__text"><strong>{username} </strong>{caption}</h4>
            


            {/* 댓글 뷰 */}
            <div className="post__comments">
                {comments.map((comment) => (
                    <p>
                        <strong>{comment.username}</strong> {comment.text}
                    </p>
                ))}
            </div>



            <form className="post__commentBox">
                <input
                className="post__input"
                type="text"
                placeholder="Add a comment..."
                value={comment}
                onChange={(e)=>setComment(e.target.value)} />
                <button
                disabled={!comment}
                className="post__button"
                type="submit"
                onClick={postComment}>Post</button>
            </form>
        </div>
    )
}

export default Post
