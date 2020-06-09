import React, { Component } from 'react';
import { Table, Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import '../css/userInfoFrm.css';
class AddUser extends Component {
    state = {
            userName: "",
            password: "",
            age: ""
    }

    userNameSavePoint = () => {
        var userName = "";
        if(this.state.userName!==""){
            userName = this.state.userName;
        }
        return userName;
    }

    userPasswordSavePoint = () => {
        var password = "";
        if(this.state.password!==""){
            password = this.state.password
        }
        return password;
    }

    userAgeSavePoint = () => {
        var age = "";
        if(this.state.age!==""){
            age = this.state.age
        }
        return age;
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
                                        },() => this.props.onChange(this.state));
                                    }.bind(this)
                                } value={this.userNameSavePoint()} /></th>
                            </tr>
                            <tr>
                                <th>비밀번호</th>
                                <th><input type="password" placeholder="비밀번호" maxLength="10" name="password" onChange={
                                    function (e) {
                                        this.setState({
                                                password: e.target.value
                                        },() => this.props.onChange(this.state));
                                    }.bind(this)
                                } value={this.userPasswordSavePoint()} /></th>
                            </tr>
                            <tr>
                                <th>나이</th>
                                <th><input type="number" placeholder="나이" name="age" onChange={
                                    function (e) {
                                        this.setState({
                                                age:  e.target.value
                                        },() => this.props.onChange(this.state));
                                    }.bind(this)
                                } value={this.userAgeSavePoint()} /></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><Button type="submit" variant="outline-secondary" style={style}>회원 등록</Button></td>
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

export default AddUser;