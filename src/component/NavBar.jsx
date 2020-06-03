import React, { Component } from 'react';
import '../css/nav.css';

class NavBar extends Component {

    bookManager = (e) =>{
        e.preventDefault();
        this.props.history.push("/book-manager");
    }


    render() {
        return (
            <div>
                <ul>
                    <li><a className="active" href="#home">Home</a></li>
                    <li><a href="#news" onClick={this.bookManager}>도서 관리</a></li>
                    <li><a href="#contact">회원 관리</a></li>
                </ul>
            </div>
        );
    }
}
export default NavBar;