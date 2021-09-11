< 인스타그램 리액트 클론코딩 >

```powershell
npx create-react-app instagram-clone
```

```powershell
cd instagram
```

```powershell
npm start
```

---

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c5185089-d91f-4532-b2d2-2b38dd58b658/Untitled.png)

## 기술 스택

- HTML
- JavaScript
- React
- Firebase

## 코드설명

# App.js

## 1. 헤더구현

```jsx
{/*Header*/}
      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />
        
        {user ? (
          <Button onClick={() => auth.signOut()}>LogOut</Button>
        ) : (
          <div className="app__loginContainer">
            <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
            <Button onClick={() => setOpen(true)}>Sign Up</Button>
          </div>
      )}
      </div>
```

현재 로그인, 회원가입의 상태에 맞춰, 다른 버튼을 출력함

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/cf75373c-1384-4d67-bac5-2a5a3e081c0c/Untitled.png)

- user가 있는 경우,

클릭시 signOut() 함수가 동작하는 "LogOut" 버튼 띄우기

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/af5af8c2-952c-4bf1-888b-a368191e0ae5/Untitled.png)

- user가 없는 경우,

클릭시 setOpenSignIn() 함수에 true값이 들어가는 "Sign In" 버튼 띄우기

클릭시 setOpen() 함수에 true값이 들어가는 "Sign Up" 버튼 띄우기

## 2. 회원가입/로그인

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2efebc02-0e9a-4a3a-b3ae-306db7b113e7/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a6227eb8-da55-4e35-8f8c-6bc672933308/Untitled.png)

### (1) modal 사용

```jsx
import Modal from '@material-ui/core/Modal';
```

modal 모듈 설치

[https://material-ui.com/components/modal/](https://material-ui.com/components/modal/)

```jsx
const classes = useStyles();
const [modalStyle] = useState(getModalStyle);
const [open, setOpen] = useState(false);
const [openSignIn, setOpenSignIn]=useState(false);
```

modal창을 여닫을 불린값 선언함

- open (Boolean) → setOpen 생성 : 회원가입(sign up) modal창 조절
- openSignIn (Boolean) → setOpenSignIn 생성 : 로그인(sign in) modal창 조절

처음 useState 상태값은 둘다 false로 화면을 띄우지 않음

```jsx
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [email, setEmail] = useState('');
```

modal창에서 입력받을 변수들 선언함

- username (String) → setUsername 생성 : 유저이름 저장
- password (String) → setPassword 생성 : 유저 비밀번호 저장
- email (String) → setEmail 생성 : 유저 이메일 저장

처음 useState 상태값은 모두 빈 문자열로 초기화함

### (2) 회원가입 구현

```jsx
<Modal
        open={open}
        onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img
                className="app__headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt="" />

              <Input placeholder="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
              <Input placeholder="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
              <Input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

              <Button type="submit" onClick={signUp}>Sign Up</Button>
            </center>
          </form>
        </div>
      </Modal>
```

- 회원가입 형태 구현

setOpen()에 true이 전달되면서 modal 열림 (center에 image 1개와 Input 3개와 버튼 1개)

escapeKey OR backdrop 실행시, setOpen()에 false 전달되면서 modal 닫힘

value값으로 앞서 선언한 변수를 지정 → 값 변동이 생기면 setUsername, setEmail, setPassword 함수가 동작하면서 useState 상태값을 바꿈

"Sign Up" 버튼을 클릭하면 signup함수가 실행됨

```jsx
  const signUp = (event) => {
    event.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username
        })
      })
      .catch((error) => alert(error.message))

      setOpen(false); //회원가입 modal 닫기
  }
```

- 회원가입 버튼 활성화

createUserWithEmailAndPassword()에 email, password 전달

```jsx
* @param email The user's email address.
     * @param password The user's chosen password.
     */
    createUserWithEmailAndPassword(
      email: string,
      password: string
    ): Promise<firebase.auth.UserCredential>;
```

firebase로 회원가입이 완료되면, username이 업데이트 됨

오류발생시, 오류메시지를 띄움

모든 기능이 완료되면 setOpen()에 false값을 전달해서 modal창을 닫음

### (3) 로그인 구현

```jsx
<Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img
                className="app__headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt="" />

              <Input placeholder="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
              <Input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

              <Button type="submit" onClick={signIn}>Sign In</Button>
            </center>
          </form>
        </div>
      </Modal>
```

- 로그인 형태 구현

setOpenSignIn()에 true이 전달되면서 modal 열림 (center에 image 1개와 Input 2개와 버튼 1개)

escapeKey OR backdrop 실행시, setOpenSignIn()에 false 전달되면서 modal 닫힘

value값으로 앞서 선언한 변수를 지정 → 값 변동이 생기면 setEmail, setPassword 함수가 동작하면서 useState 상태값을 바꿈

"Sign In" 버튼을 클릭하면 signIn함수가 실행됨

```jsx
const signIn=(event)=>{
    event.preventDefault();

    auth
    .signInWithEmailAndPassword(email, password)
    .catch((error)=>alert(error.message))

    setOpenSignIn(false); //로그인 modal 닫기
  }
```

- 로그인 버튼 활성화

signInWithEmailAndPassword()에 email, password 전달

```jsx
* @param email The users email address.
     * @param password The users password.
     */
    signInWithEmailAndPassword(
      email: string,
      password: string
    ): Promise<firebase.auth.UserCredential>;
```

모든 기능이 완료되면 setOpenSignIn()에 false값을 전달해서 modal창을 닫음

### (4) firebase에서 사용자 관리

[https://firebase.google.com/docs/auth/web/manage-users?hl=ko](https://firebase.google.com/docs/auth/web/manage-users?hl=ko)

```jsx
const [user, setUser] = useState(null); // 추적할 상태 조각 변수들
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user has logged in..
        console.log(authUser);
        setUser(authUser); 
        if (authUser.displayName) {
          // dont update username
        }
        else {
          // if we just created someone
          return authUser.updateProfile({
            displayName: username,
          });
        }
      }
      else {
        // user has logged out..
        setUser(null);
      }
    })

    // 함수처리
    return () => {
      unsubscribe();
    }
  }, [user, username]);
```

react의 useEffect 이용 (unsubscribe함수)

- onAuthStateChanged : 현재 로그인한 회원 정보 가져오는 메서드
1. 회원정보가 있다면, 로그인 상태

     setUser(authUser); 를 통해 새로고침을 해도 여전히 로그인 되도록 구현

    유저정보가 displayName 되면 → 업데이트 할 필요가 없음

    유저정보가 displayName 안되면 → updateProfile 사용해 username 업데이트

2. 회원정보가 없다면, 로그아웃 상태

    setUser(null);

    현재 유저상태를 null로 처리함
    

user : 추적할 State 조각 변수들 저장

username : 입력받은 유저의 이름

## 3. POST

```jsx
{/*Posts*/}
      <div className="app__posts">
        <div className="app__postsLeft">
          {
            posts.map(({ id, post }) => (
              <Post key={id} postId={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
            ))
          }
        </div>
			</div>
```

map 이용

고유키로 firebase의 id값 추가함

새 게시물이 추가되면 → post.js에 key와 id를 추가함으로써 어느 부분이 변경되었는지 전달

즉, 새로고침 하지 않고 자동으로 추가됨 (=전체 render 불필요해짐)

추가되는 부분을 알기 때문에 해당 부분만 새로고침되어 추가됨

```jsx
  useEffect(() => {
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      //every time a new post is added, this code.
   
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    })
  }, []);
```

- orderBy : 타임기록 기능 수행함
- onSnapshot : firebase의 문서가 변경되면, 새로고침없이 자동으로 추가수정됨

for문처럼, firebase의 문서(document)를 계속 반복확인함

게시글(post)이 될 문서 내부에는 username, caption, imageUrl 이 들어있음

게시글을 계속 업데이트 함 → 하드코딩이 불필요해짐

id : firebase에서 문서의 자동 id를 저장함

post : 해당 id의 데이터요소들을 저장함

## 4. Firebase

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b47782ce-2178-4845-8497-3e7df6001916/Untitled.png)

posts : 게시글 목록

comments : 각 게시글마다의 댓글 목록

## 5. image 업로드 화면

```jsx
{user?.displayName?(
        <ImageUpload username={user.displayName}/>
      ):(
        <h3>sorry you need to login to upload</h3>
      )}
```

user가 없는 상황, 즉 로그인이 되어 있지 않으면 게시글을 올릴 수 없음

따라서, user가 정의되지 않았을 경우의 예외처리가 필요함

1. 유저가 있는 경우

    ImageUpload.js 로 username을 전달함

2. 유저가 없는 경우

    에러문구 띄움

# Post.js

```jsx
function Post({postId, user, username, caption, imageUrl}) {
```

postId : firebase에서 자동생성된 id

user : 현재 로그인되어 있는 사람

username : 각 게시글의 주인, 게시글을 작성한 사람

caption : 게시글의 글

imageUrl : 게시글의 이미지

## 1. 게시글 형태 구현

- Avatar 사용

```jsx
import Avatar from "@material-ui/core/Avatar";
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/bffc96aa-a68e-4e62-8a7f-7984398e0732/Untitled.png)

```jsx
{/* header -> avater + username */}
            <div className="post__header">
                <Avatar
                    className="post__avater" alt="RafehQazi"
                    src="/static/images/avater/1.png" />
                <h3>{username}</h3>
            </div>
```

1. Avatar와 게시글의 주인이름을 명시함

```jsx
{/* image */}
            <img className="post__image" src={imageUrl} alt="" />
```

2. 게시글의 이미지를 띄움

```jsx
{/* username + caption */}
            <h4 className="post__text"><strong>{username} </strong>{caption}</h4>
```

3. 게시글의 주인이름과 해당 게시글의 글을 띄움

```jsx
{/* 댓글 뷰 */}
            <div className="post__comments">
                {comments.map((comment) => (
                    <p>
                        <strong>{comment.username}</strong> {comment.text}
                    </p>
                ))}
            </div>
```

4. 게시글에 달린 댓글의 주인과 댓글을 띄움

```jsx
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
```

5. 댓글을 입력하는 form 구현함

    input으로 comment를 받고, 상태가 변할때마다 setComment로 감지함

    comment의 내용이 없다면, 버튼을 비활성화함

    "Post"버튼으로 클릭시 postComment함수가 동작함

## 2. post 기능

```jsx
const [comments, setComments]=useState([]);
const [comment, setComment]=useState('');
```

< firebase에서의 변수명과 반드시 일치해야함 >

comments : 전체 댓글 목록 (배열)

comment : 한 게시글에 대한 하나의 댓글 (String)

```jsx
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
    }, [postId]);
```

- 댓글 업데이트

react의 useEffect 사용

firebase에서 comments 부분으로 접근 → 댓글 업데이트 가능

즉, 특정한 한 게시글에 comment로 댓글이 하나씩 추가됨 (comment는 중첩목록)

해당하는 게시글의 id가 있으면 실행

접근 순서 : posts → 각 post의 id → 각 id의 comments

setComments() 이용해서 id의 data를 추가함

Post의 내부 변수인 postId 가 변경될때마다 실행됨

```jsx
const postComment =(event)=>{
        event.preventDefault();
            
        db.collection("posts").doc(postId).collection("comments").add({
            text: comment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        setComment('');
    }
```

- 댓글버튼 활성화

접근 순서 : posts → 각 post의 id → 각 id의 comments

해당 게시글의 comments에 add함

text : 댓글

username : 댓글 작성자

timestamp : firebase 서버 시간

댓글 추가를 완료한 뒤, setComment를 초기화함 (setComment는 comment를 관리함)

# ImageUpload.js

## 1. imageUpload 형태 구현

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2d56e94f-d424-4e49-a9ff-5004dbe5e11b/Untitled.png)

```jsx
<div className="imageupload">
            <progress className="imageupload_progress" value={progress} max="100" />
            <input type="text" placeholder="Enter a cation.." onChange={event=>setCaption(event.target.value)} value={caption}/>
            <input type="file" onChange={handleChange} />
            <Button onClick={handleUpload}>Upload</Button>
        </div>
```

이미지 파일 선택 기능 + 글작성 기능 + 업로드 버튼 기능

```jsx
const [caption, setCaption]=useState('');
const [image, setImage]=useState(null);
const [progress, setProgress]=useState(0);
```

- progress (setProgress) : 진행 막대바 (초기설정 : 0 ~ max : 100)
- caption (setCaption) : 게시글 저장
- image (setImage) : 게시글의 이미지 저장

file 타입의 input을 이용해 파일선택 기능 구현함 → 클릭시 handleChange 동작함

"Upload" 버튼 → 클릭시 handleUpload 동작함

## 2. 파일선택 기능

```jsx
const handleChange=(e)=>{
        if(e.target.files[0]){ 
            setImage(e.target.files[0]);
        }
    };
```

파일을 가져와서 해당 파일을 이미지 상태 그대로 저장함

## 3. 이미지 업로드 기능

```jsx
const handleUpload=()=>{
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
```
