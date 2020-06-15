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
        users.map(user => user.checked = false);

        this.setState({ users });
    }
    delUser = (e) => {
        e.preventDefault();
        if(this.state.editMode===true){
            alert("수정 중엔 회원을 삭제 할 수 없습니다.");
            return;
        }
       var delUserList = this.state.users.filter(user => user.checked===true);
        console.log(delUserList);
        axios.delete(USER_API_BASE_URL + "/delete", { data: delUserList })
            .then(res => {
                this.setState({
                    users: this.state.users.filter(user => user.checked===false),
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
                delete user.message;
                user.checked=false;
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
        const id = e.target.value;
        var idNum = parseInt(id);
        const target = e.target;
        const checked = target.checked;
        var arr = this.state.users;
        if (checked === false) {
            for (var key in arr) {
                if (arr[key].ID === idNum) {
                    var sel = arr[key];
                    sel.checked = false;
                    this.setState({
                        users: arr
                    })
                    return;
                }
            }
        }
        if (checked === true) {
            for (var k in arr) {
                if (arr[k].ID === idNum) {
                    var sel1 = arr[k];
                    sel1.checked = true;
                    this.setState({
                        users: arr
                    })
                    return;
                }
            }
        }


    }
    editUser = (e) => {
        e.preventDefault();
        var cnt =0 ;
        var arr = this.state.users;

        for(var key in arr){
            if(arr[key].checked===true){
                cnt++;
            }
        }

        if(cnt===0){
            alert("수정할 회원을 선택 해주세요.");
            return;
        }


        this.userList();
        if (this.state.editMode === true) {
            this.setState({
                editMode: false
            });
        } else {
            this.setState({
                editMode: true
            })
        }
    }

    editUsers = (e,userID) =>{
        var name = e.target.name;
        var value = e.target.value;
        var arr = this.state.users
        for(var key in arr){
            if(arr[key].ID===userID){
                if(name ==='username'){
                    arr[key].USERNAME=value
                }else if(name ==='password'){
                    arr[key].PASSWORD=value
                }else if(name ==='age'){
                    arr[key].AGE=value
                }
            } 
        }
        this.setState({
            users : arr
        });

    }

    cancelcheck = (e) =>{
        if(e.target.checked===false){
            e.preventDefault();
            alert("저장을 먼저 하세요.");
            return;
        }

    }


    userList = () => {
        if (this.state.editMode === false) {
            return (
                this.state.users.map(user =>
                    <tr key={user.ID}>
                        <td><input type="checkbox" onChange={this.checkUser} value={user.ID} checked={this.state.users.checked}
                        />&nbsp;&nbsp;{user.ID}</td>
                        <td>{user.USERNAME}</td>
                        <td>{user.PASSWORD}</td>
                        <td>{user.AGE}</td>
                    </tr>
                )
            );
        } else {
            return (
                this.state.users.map(user => {
                    if (user.checked === true) {
                        return(<tr key={user.ID}>
                            <td><input type="checkbox" value={user.ID} checked={this.state.users.checked}
                            onClick={this.cancelcheck}
                            />&nbsp;&nbsp;{user.ID}</td>
                            <td><input type="text" value={user.USERNAME} name="username" onChange={function(e){
                                this.editUsers(e,user.ID);
                            }.bind(this)}/></td>
                            <td><input type="text" value={user.PASSWORD} name='password' onChange={function(e){
                                this.editUsers(e,user.ID);
                            }.bind(this)}/></td>
                            <td><input type="number" value={user.AGE} name='age' onChange={function(e){
                                this.editUsers(e,user.ID);
                            }.bind(this)}/></td>
                        </tr>)
                    }
                    return <tr key={user.ID}>
                        <td><input type="checkbox" onChange={this.checkUser} value={user.ID} checked={this.state.users.checked}
                        />&nbsp;&nbsp;{user.ID}</td>
                        <td>{user.USERNAME}</td>
                        <td>{user.PASSWORD}</td>
                        <td>{user.AGE}</td>
                    </tr>
                })
            )
        }
    }

    editModeCheck =() => {
        var result;
        if(this.state.editMode===true){
            result=<Button variant="outline-warning" onClick={this.editUserSave} style={style1}>저장</Button>
        }else{
            result=null;
        }
        return result;
    }

    editUserSave = () => {

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
                        {this.editModeCheck()}
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

const style1 ={
    color : '#5a6268',
    fontWeight: "bold",
    border : "1.5px solid #ffc107",
    marginLeft:"8px"
}
export default UserManager;