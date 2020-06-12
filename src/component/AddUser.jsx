import React, { Component } from 'react';
import { Table, Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import '../css/userInfoFrm.css';
import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:8090";

class AddUser extends Component {
    state = {
        userName : '',
        password : '',
        age : ''
    }

    componentWillUnmount(){
        if(this.state.userName!==''||this.state.password!==''||this.state.age!==''){
            //저장 logic을 쓰면 된다.
           alert(this.state);
        }
    }

    async addUser(e) {
        e.preventDefault();
        var user = this.state;
        var {data : result } = await axios.post(USER_API_BASE_URL+"/add",user);
        alert(result.message);
        if(result.message === 'success'){
            this.props.user(result)
            this.setState({
                userName : '',
                password : '',
                age : ''
            })
            this.props.onChange(null,null,null,'reset');
        }
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.checkFrm} className="userInfoFrm">
                    <Table>
                        <thead>
                            <tr>
                                <th>회원이름</th>
                                <th><input type="text" placeholder="회원이름(아이디)" maxLength="10" name="userName" onChange={
                                    function (e) {
                                        this.setState({
                                            userName:e.target.value
                                        },()=>this.props.onChange(this.state.userName,null,null));
                                    }.bind(this)
                                } value={this.state.userName} /></th>
                            </tr>
                            <tr>
                                <th>비밀번호</th>
                                <th><input type="password" placeholder="비밀번호" maxLength="10" name="password" onChange={
                                    function (e) {
                                        this.setState({
                                                password: e.target.value
                                        },()=>this.props.onChange(null,this.state.password,null));
                                    }.bind(this)
                                } value={this.state.password} /></th>
                            </tr>
                            <tr>
                                <th>나이</th>
                                <th><input type="number" placeholder="나이" name="age" onChange={
                                    function (e) {
                                        this.setState({
                                                age:  e.target.value
                                        },()=>this.props.onChange(null,null,this.state.age));
                                    }.bind(this)
                                } value={this.state.age} /></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><Button type="submit" variant="outline-secondary" style={style} onClick={this.addUser.bind(this)}>회원 등록</Button>
                                <Button type="submit" variant="outline-warning" style={style1}>임시 저장</Button>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Form>
            </div>
        );
    }


}

const style = {
    fontWeight: "bold"
}

const style1 ={
    color : '#5a6268',
    fontWeight: "bold",
    border : "1.5px solid #ffc107",
    marginLeft:"8px"
}

export default AddUser;