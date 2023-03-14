import "../scss/main.css"
import { useRef } from "react";
import { axiosPost } from "../api/core";
import { encrypt } from "../hooks/aes256";


const LoginModal = ({ setLoginModal }) => {

const closeModal = () => {
  setLoginModal(false);
} 

const idRef = useRef(null);
const pwRef = useRef(null);

const singInHandler = (e) => {
  e.preventDefault();
  const url = '/user/signin.do';
  const id = idRef.current.value;
  const pw = pwRef.current.value; 

  const data = {
    id: id,
    password: encrypt(pw)
  }
  console.log(data);
  
  axiosPost(url, data)
  .then((res) => {
    const data = res.data;
    if(data.result) {
      console.log('로그인 완료');
      setLoginModal(false);
    } else {
      alert(data.message);
      console.log(data.message);
    }
  })
  .catch((err) => {
    console.log(err);
  });
}


  return(
    <div className="login_wrap" onClick={closeModal}>
      <div className="login_modal" onClick={(e)=>{e.stopPropagation()}}>
        <form onSubmit={singInHandler}>
          <div>아이디</div> 
            <input className="login_input"
              required
              ref={idRef}
            />
          <div className="login_pw">비밀번호</div> 
            <div>
              <input className="login_input"
                required
                ref={pwRef}  
              />
            </div>
          <div>
            <button className="login_btn">로그인</button>
          </div>
        </form>
      </div>

    </div>
  )
}

export default LoginModal;