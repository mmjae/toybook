import React, { Component } from 'react';
import axios from "axios";
import { Table, ButtonGroup, Button } from 'react-bootstrap';
import AddUser from '../component/AddUser';

const USER_API_BASE_URL = "http://localhost:8090";


class UserManager extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            mode : "",
            delList : [],
            addUser : {}
        }
    }

    componentDidMount() {
        this.getUsersList();
    }
    async getUsersList() {
        var { data : users } = await axios.get(USER_API_BASE_URL + "/users");
        this.setState({ users });
    }
    delUser = (e) => {
        e.preventDefault();

        var delList=this.state.delList;

         axios.delete(USER_API_BASE_URL +"/delete",{data : delList})
             .then(res => {
                        this.setState({
                           users: this.state.users.filter((user) =>!delList.includes(user.ID)),
                           delList : []
                        });
                        alert(res.data.message);
             }).catch( err => { console.log(err) });
    }

    addUser = (e) =>{
        e.preventDefault();
        this.setState({
            mode : "add"
        });
    }

    modeCheck = () =>{
        if(this.state.mode === "add"){
            var result = <AddUser onChange={function(user){
                this.props.onChange(user);
            }.bind(this)}></AddUser>;
        }

        return result;
    }

    checkDelUser = (e) => {
        const target = e.target;
        const checked = target.checked;
        const id = e.target.value;
        var idNum= parseInt(id);
        var arr =this.state.users;
        var delArr= this.state.delList;

        if(checked === true ){
            for(var key in arr){
                if(arr[key].ID === idNum ){
                    delArr.push(idNum);
                }
            }
        }else if(checked === false){
            for(var k in arr){
                if(arr[k].ID === idNum ){
                    delArr.splice(idNum,1);
                }
            }
        }
    }



    render() {
        return (
            <div>
                <div>
                    <ButtonGroup style={btnStyle}>
                        <Button variant="secondary" onClick={this.addUser}>회원 추가</Button>
                        <Button variant="secondary" onClick={this.delUser}>회원 삭제</Button>
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
                        {this.state.users.map(user =>
                            <tr key={user.ID}>
                                <td><input type="checkbox" onChange={this.checkDelUser} value={user.ID}/>&nbsp;&nbsp;{user.ID}</td>
                                <td>{user.USERNAME}</td>
                                <td>{user.PASSWORD}</td>
                                <td>{user.AGE}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>);
    }
}

const btnStyle = {
    marginBottom: "15px",
    marginLeft : "15px",
}


const style = {
    backgroundColor: "#848484",
    color: "white",
    fontWeight: "bold"
}
export default UserManager;