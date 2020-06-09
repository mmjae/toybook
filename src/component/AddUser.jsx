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

    //임시저장 데이터 props로 뿌려서 받아와야함

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