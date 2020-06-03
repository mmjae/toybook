import React ,{Component} from 'react';
import BackImg from '../img/li.jpg';

var sectionStyle = {
    width : "100%" ,
    height : "170px",
    backgroundImage : 'url('+ BackImg +')'
}
var write ={
    fontSize : "32px",
    fontWeight : "bold",
    textAlign : "center",
    color : "white",
    paddingTop : "50px",
    cursor: "default"
}

class Header extends Component{
    render() {
        return (
            <div style={sectionStyle}>
                <div style={write}>Toy Book</div>
            </div>
        );
    }

}
export default Header;