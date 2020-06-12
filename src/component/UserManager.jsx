import React, { Component } from 'react';
import axios from "axios";
import { Table, ButtonGroup, Button } from 'react-bootstrap';
import AddUser from '../container/AddUser';

const USER_API_BASE_URL = "http://localhost:8090";


class UserManager extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            mode: "addOn",
            checkUser: [],
            addUser: {},
            editMode: false
        }
    }

    componentDidMount() {
        this.getUsersList();
    }

    async getUsersList() {
        var { data: users } = await axios.get(USER_API_BASE_URL + "/users");
        this.setState({ users });
    }
    delUser = (e) => {
        e.preventDefault();

        var checkUser = this.state.checkUser;

        axios.delete(USER_API_BASE_URL + "/delete", { data: checkUser })
            .then(res => {
                this.setState({
                    users: this.state.users.filter((user) => !checkUser.includes(user.ID)),
                    checkUser: []
                });
                alert(res.data.message);
            }).catch(err => { console.log(err) });
    }

    addUser = (e) => {
        e.preventDefault();
        if (this.state.mode === "addOff") {
            this.setState({
                mode: "addOn"
            })
        } else if (this.state.mode === 'addOn') {
            this.setState({
                mode: "addOff"
            })
        }
    }

    modeCheck = () => {
        var result;
        if (this.state.mode === "addOff") {
            result = <AddUser user={function (user) {
                this.setState({
                    users: this.state.users.concat(user)
                });
            }.bind(this)}></AddUser>;
        } else if (this.state.mode === "addOn") {
            result = null;
        }
        return result;
    }

    checkUser = (e) => {
        const target = e.target;
        const checked = target.checked;
        const id = e.target.value;
        var idNum = parseInt(id);
        var arr = this.state.users;

        if (checked === true) {
            for (var key in arr) {
                if (arr[key].ID === idNum) {
                    this.setState({
                        checkUser : this.state.checkUser.concat(idNum)
                    })
                }
            }
        } else if (checked === false) {
            for (var k in arr) {
                if (arr[k].ID === idNum) {
                    this.setState({
                        checkUser : this.state.checkUser.splice(idNum, 1)
                    })
                }
            }
        }
    }
    editUser = (e) => {
        e.preventDefault();
        this.userList();
        if(this.state.editMode===true){
            this.setState({
                editMode : false
            });
        }else{
            this.setState({
                editMode : true
            })
        }
    }

    userList = () => {
        if (this.state.editMode === false) {
            return (
                this.state.users.map(user =>
                    <tr key={user.ID}>
                        <td><input type="checkbox" onChange={this.checkUser} value={user.ID}
                        />&nbsp;&nbsp;{user.ID}</td>
                        <td>{user.USERNAME}</td>
                        <td>{user.PASSWORD}</td>
                        <td>{user.AGE}</td>
                    </tr>
                )
            );
        } else {
            var checkUser = this.state.checkUser;
            var editUsers = this.state.users.filter((user) => checkUser.includes(user.ID));
            return(
            editUsers.map(user =>
                <tr key={user.ID}>
                    <td>{user.ID}</td>
                    <td><input type="text" value={user.USERNAME}/></td>
                    <td><input type="text" value={user.PASSWORD}/></td>
                    <td><input type="text" value={user.AGE}/></td>
                </tr>
                )
            )
        }
    }

    render() {

        return (
            <div>
                <div>
                    <ButtonGroup style={btnStyle}>
                        <Button variant="secondary" onClick={this.addUser}>회원 추가</Button>
                        <Button variant="secondary" onClick={this.delUser}>회원 삭제</Button>
                        <Button variant="secondary" onClick={this.editUser}>회원 수정</Button>
                    </ButtonGroup>
                </div>
                <div>{this.modeCheck()}</div>
                <Table striped bordered hover>
                    <thead style={style}>
                        <tr>
                            <td>고유번호</td>
                            <td>아이디</td>
                            <td>비밀번호</td>
                            <td>나이</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.userList()}
                    </tbody>
                </Table>
            </div>);
    }
}

const btnStyle = {
    marginBottom: "15px",
    marginLeft: "15px",
}


const style = {
    backgroundColor: "#848484",
    color: "white",
    fontWeight: "bold"
}
export default UserManager;