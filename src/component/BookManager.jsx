import React, { Component } from 'react';
import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8090";

class BookManager extends Component {

    constructor(props) {
        super(props);
        this.state = {
            books: []
        }
    }
    render() {
        return (
            <div>
                
            </div>
        );
    }
  
}
export default BookManager;