import React, { Component } from 'react';
import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8090";

class BookManager extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }
    componentDidMount() {
        this.getUsersList();
    }
    async getUsersList() {
        var { data: users } = await axios.get(USER_API_BASE_URL + "/users");
        this.setState({ users });
    }
    render() {
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>USERNAME</td>
                            <td>PASSWORD</td>
                            <td>AGE</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.users.map(user =>
                            <tr key={user.ID}>
                                <td>{user.ID}</td>
                                <td>{user.USERNAME}</td>
                                <td>{user.PASSWORD}</td>
                                <td>{user.AGE}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>);
    }

}
export default BookManager;