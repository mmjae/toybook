import React, { Component } from 'react';
import '../css/nav.css';
import {Link} from 'react-router-dom';
import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8090";

class NavBar extends Component {

     async tempoUser (userData) {
         var {data : message} = await axios.post(USER_API_BASE_URL+"/temporayuser",{
             username : userData.username,
             password : userData.password,
             age : userData.age
         });
         alert(message.message);
         if(message.message==='success'){
            this.props.tUserDelete();
         }
     }
    checkFrm = () =>{
        if(Object.keys(this.props.tuser).length!==0){
            if(window.confirm('저장 되지 않는 데이터가 있습니다. 저장 하시겠습니까?')){
                   this.tempoUser(this.props.tuser);
            }else{
                this.props.tUserDelete();
            }
        }
    }

    render() {
        return (
            <div>
                <ul>
                    <li><Link to="/" className="active" onClick={this.checkFrm}>Home</Link></li>
                    <li><Link to="/book-manager" onClick={this.checkFrm}>도서 관리</Link></li>
                    <li><Link to="/user-manager" >회원 관리</Link></li>
                </ul>
            </div>
        );
    }
}
export default NavBar;