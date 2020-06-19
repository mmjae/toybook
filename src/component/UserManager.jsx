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
            addUser: {},
            editUsers : [],
            editMode: false,
            temporayMode : false   
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
        if (this.state.editMode === true) {
            alert("수정 중엔 회원을 삭제 할 수 없습니다.");
            return;
        }
        var delUserList = this.state.users.filter(user => user.checked === true);
        console.log(delUserList);
        axios.delete(USER_API_BASE_URL + "/delete", { data: delUserList })
            .then(res => {
                this.setState({
                    users: this.state.users.filter(user => user.checked === false),
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
                user.checked = false;
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



        var arr = this.state.users.slice(0);
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
        var arrr = this.state.users.slice(0);

        if (checked === true) {
            for (var k in arrr) {
                if (arrr[k].ID === idNum) {
                    var sel1 = arrr[k];
                    sel1.checked = true;
                    var editUser = {}
                    editUser.USERNAME=sel1.USERNAME;
                    editUser.PASSWORD=sel1.PASSWORD;
                    editUser.AGE=sel1.AGE;
                    editUser.ID=sel1.ID;
                    this.setState({
                        users: arrr,
                        editUsers : this.state.editUsers.concat(editUser)
                    })
                    return;
                }
            }
        }


    }
    editUser = (e) => {
        e.preventDefault();
        var cnt = 0;
        var arr = this.state.users;

        for (var key in arr) {
            if (arr[key].checked === true) {
                cnt++;
            }
        }
        if (cnt === 0) {
            alert("수정할 회원을 선택 해주세요.");
            return;
        }
        if (this.state.editMode === true) {
            for (var k in arr) {
                if (arr[k].checked === true) {
                    alert("저장을 먼저 해주세요.");
                    return;
                }
            }
            this.setState({
                editMode: false
            });
        } else {

            var arrr = this.state.users.slice(0);
            var setEditUser = []
            for(var i in arrr ){
                
                if(arrr[i].checked===true){
                    var editUserObj ={}
                    editUserObj.USERNAME = arrr[i].USERNAME;
                    editUserObj.PASSWORD = arrr[i].PASSWORD;
                    editUserObj.AGE = arrr[i].AGE;
                    editUserObj.ID = arrr[i].ID;
                    setEditUser.push(editUserObj);
                }

            }

            this.setState({
                editMode: true,
                editUsers : setEditUser
            })
        }

        this.userList();

    }

    editUsers = (e, userID) => {
        var name = e.target.name;
        var value = e.target.value;
        var editArr = this.state.editUsers

        //수정 모드가 켜져 있는 상태로 체크가 추가 될시에 후 처리를 어떻게 해야될지 작업이 필요함

        for (var key in editArr) {
            if (editArr[key].ID === userID) {
                if (name === 'username') {
                    editArr[key].USERNAME = value
                } else if (name === 'password') {
                    editArr[key].PASSWORD = value
                } else if (name === 'age') {
                    editArr[key].AGE = value
                }
            }
        }

        this.setState({
            editUsers : editArr
        })

      

    }

    cancelcheck = (e) => {
        e.preventDefault();
        if (e.target.checked === false) {
            alert("저장을 먼저 해주세요.");
            return;
        }
    }


    userList = () => {
        if (this.state.editMode === false) {
            return (
                this.state.users.map(user =>
                    <tr key={user.ID}>
                        <td><input type="checkbox" onChange={this.checkUser} value={user.ID||''} checked={user.checked||''}
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
                        return (<tr key={user.ID}>
                            <td><input type="checkbox"
                                value={user.ID}
                                checked={user.checked}
                                onChange={this.cancelcheck}
                            />&nbsp;&nbsp;{user.ID}</td>
                            <td><input type="text" defaultValue={user.USERNAME} name="username" onChange={function (e) {
                                this.editUsers(e, user.ID);
                            }.bind(this)} style={inputStyle} /></td>
                            <td><input type="text" defaultValue={user.PASSWORD} name='password' onChange={function (e) {
                                this.editUsers(e, user.ID);
                            }.bind(this)} style={inputStyle} /></td>
                            <td><input type="number" defaultValue={user.AGE} name='age' onChange={function (e) {
                                this.editUsers(e, user.ID);
                            }.bind(this)} style={ageStyle} /></td>
                        </tr>)
                    }
                    return <tr key={user.ID}>
                        <td><input type="checkbox" onChange={this.checkUser} value={user.ID||''} checked={user.checked||''}
                        />&nbsp;&nbsp;{user.ID}</td>
                        <td>{user.USERNAME}</td>
                        <td>{user.PASSWORD}</td>
                        <td>{user.AGE}</td>
                    </tr>
                })
            )
        }
    }

    editUserCancel = (e) =>{
        e.preventDefault();
        if(window.confirm('수정 하신 내용이 초기화 됩니다 계속 하시겠습니까?')){

            this.setState({
                editMode : false,
                editUsers : this.state.users
            })


        }
    }


    editModeCheck = () => {
        var result;
        if (this.state.editMode === true) {
            result = <><Button variant="outline-warning" onClick={this.editUserSave} style={style1}>저장</Button> 
            <Button variant="outline-warning" onClick={this.editUserCancel} style={style1}>취소</Button></>;
        } else {
            result = null;
        }
        return result;
    }




    editUserSave = () => {
        var arr = this.state.editUsers;
        for (var key in arr) {
            if (arr[key].USERNAME === '' || arr[key].PASSWORD === '' || arr[key].AGE === '') {
                alert('비어있는 란을 작성해주세요.');
                return;
            }
        }

        this.editUserSaveGo(arr);

    }

    async editUserSaveGo(editUsers) {
        var {data : message} = await axios.put(USER_API_BASE_URL+"/users",editUsers)
        if(message.message==="success"){

            var users = this.state.users;

            var result=users.map(function(user){
                for(var key in editUsers){
                    if(editUsers[key].ID === user.ID){
                        user=editUsers[key];
                    }
                }
                return user;
            })

            this.setState({ editMode: false,
            users : result});
        }
        alert(message.message);

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

const style1 = {
    color: '#5a6268',
    fontWeight: "bold",
    border: "1.5px solid #ffc107",
    marginLeft: "8px"
}

const inputStyle ={
    borderRadius : "9px"
}

const ageStyle = {
    width : "55px",
    borderRadius : "8px",
    fontWeight: "bold"
}
export default UserManager;