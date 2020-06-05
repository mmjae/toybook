import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

class AddUser extends Component {

    render() {
        return (
            <div>
                <Table>
                    <thead>
                        <tr>
                            <th>회원이름</th>
                            <th><input type="text" placeholder="회원이름(아이디)"/></th>
                        </tr>
                        <tr>
                            <th>비밀번호</th>
                            <th><input type="password" placeholder="비밀번호"/></th>
                        </tr>
                        <tr>
                            <th>나이</th>
                            <th><input type="number" placeholder="나이"/></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><button>회원 등록</button></td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        );
    }


}
export default AddUser;