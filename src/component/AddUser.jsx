import React, { Component } from 'react';
import { Table, Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import '../css/userInfoFrm.css';
import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:8090";

class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            age: '',
            tempoMode: false,
            tempoUsers: [],
            tempoEditMode: false
        }
    }

    componentWillUnmount() {
        if (this.state.userName !== '' || this.state.password !== '' || this.state.age !== '') {
            //저장 logic을 쓰면 된다.

        }
    }

    async addUser(e) {
        e.preventDefault();
        var user = this.state;
        console.log(user);
        var { data: result } = await axios.post(USER_API_BASE_URL + "/add", user);
        alert(result.message);
        if (result.message === 'success') {
            this.props.user(result)
            this.setState({
                userName: '',
                password: '',
                age: ''
            })
            this.props.onChange(null, null, null, 'reset');
        }
    }

    async tempoSave(e) {
        e.preventDefault();
        var tempoUser = this.state;
        var { data: result } = await axios.post(USER_API_BASE_URL + "/temporayuser", {
            username: tempoUser.userName,
            password: tempoUser.password,
            age: tempoUser.age
        });
        alert(result.message);
        if (result.message === 'success') {
            this.setState({
                userName: '',
                password: '',
                age: ''
            })
        }
    }
    tempoList = () => {
        if (this.state.tempoMode === true) {

            this.setState({
                tempoMode: false
            })

        } else if (this.state.tempoMode === false) {
            this.getTempoList();
        }
    }

    async getTempoList() {
        var { data: result } = await axios.get(USER_API_BASE_URL + "/temporayuser")
        result.map(user => user.checked = false);
        this.setState({
            tempoMode: true,
            tempoUsers: result
        })
    }

    loadUser = (e, index) => {
        e.preventDefault();
        var loadUser = this.state.tempoUsers[index];
        if (loadUser.USERNAME === undefined) {
            loadUser.USERNAME = '';
        }
        if (loadUser.PASSWORD === undefined) {
            loadUser.PASSWORD = '';
        }
        if (loadUser.AGE === undefined) {
            loadUser.AGE = '';
        }

        this.setState({
            userName: loadUser.USERNAME,
            password: loadUser.PASSWORD,
            age: loadUser.AGE,
            id: loadUser.ID,
            tempoMode: false
        });

    }

    userList = () => {
        if (this.state.tempoEditMode === false) {
            return (
                this.state.tempoUsers.map((user, index) =>
                    <tr key={user.ID}>
                        <td>{user.USERNAME}</td>
                        <td>{user.PASSWORD}</td>
                        <td>{user.AGE}</td>
                        <td>{user.SAVEDATE}</td>
                        <td><Button type="button"
                            variant="outline-warning"
                            style={style1}
                            onClick={(e) => this.loadUser(e, index)}
                        >불러오기</Button></td>
                    </tr>
                )
            )
        }else{
            return (
                this.state.tempoUsers.map((user, index) =>
                    <tr key={user.ID}>
                        <td><input type="checkBox" onChange={() => this.delTempoUser(user.ID)} checked={user.checked}/></td>
                        <td>{user.USERNAME}</td>
                        <td>{user.PASSWORD}</td>
                        <td>{user.AGE}</td>
                        <td>{user.SAVEDATE}</td>
                    </tr>
                )
            )
        }
    }

    delTempoUser =(id) =>{
        //이벤트 객체 받아와서 check true 와 false로 갈라야됌
      var result= this.state.tempoUsers.map(user => user.ID === id ? {...user, checked : true} : user);
        this.setState({
            tempoUsers : result
        })
    }

    tempoEditMode = () => {
        if (this.state.tempoEditMode === false) {
            this.setState({
                tempoEditMode: true
            })
        } else if (this.state.tempoEditMode === true) {
            this.setState({
                tempoEditMode: false
            })
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
                                            userName: e.target.value
                                        }, () => this.props.onChange(this.state.userName, null, null));
                                    }.bind(this)
                                } value={this.state.userName} /></th>
                            </tr>
                            <tr>
                                <th>비밀번호</th>
                                <th><input type="password" placeholder="비밀번호" maxLength="10" name="password" onChange={
                                    function (e) {
                                        this.setState({
                                            password: e.target.value
                                        }, () => this.props.onChange(null, this.state.password, null));
                                    }.bind(this)
                                } value={this.state.password} /></th>
                            </tr>
                            <tr>
                                <th>나이</th>
                                <th><input type="number" placeholder="나이" name="age" onChange={
                                    function (e) {
                                        this.setState({
                                            age: e.target.value
                                        }, () => this.props.onChange(null, null, this.state.age));
                                    }.bind(this)
                                } value={this.state.age} /></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><Button type="submit" variant="outline-secondary" style={style} onClick={this.addUser.bind(this)}>회원 등록</Button>
                                    <Button type="button" variant="outline-warning" style={style1} onClick={this.tempoSave.bind(this)}>임시 저장</Button>
                                    <Button type="button" variant="outline-warning" style={style1} onClick={this.tempoList}>불러오기</Button>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Form>
                <Modal show={this.state.tempoMode} onHide={function () {
                    this.setState({
                        tempoMode: false
                    })
                    return false
                }.bind(this)} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>임시 저장 리스트</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Table striped bordered hover>
                            <thead style={style2}>
                                <tr>
                                    <td>아이디</td>
                                    <td>비밀번호</td>
                                    <td>나이</td>
                                    <td>저장날짜</td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody>
                                {this.userList()}
                            </tbody>
                        </Table>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="button" variant="outline-info" onClick={this.tempoEditMode}>삭제</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }


}

const style2 = {
    backgroundColor: "#848484",
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
}



const style = {
    fontWeight: "bold"
}

const style1 = {
    color: '#5a6268',
    fontWeight: "bold",
    border: "1.5px solid #ffc107",
    marginLeft: "8px"
}

export default AddUser;