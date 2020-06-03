import React, { Component } from 'react';
import '../css/nav.css';
import {Link} from 'react-router-dom';
class NavBar extends Component {
    
    render() {
        return (
            <div>
                <ul>
                    <li><Link to="/" className="active">Home</Link></li>
                    <li><Link to="/book-manager">도서 관리</Link></li>
                    <li><Link to="/user-manager" >회원 관리</Link></li>
                </ul>
            </div>
        );
    }
}
export default NavBar;