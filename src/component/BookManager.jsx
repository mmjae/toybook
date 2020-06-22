import React, { Component } from 'react';
import { Container, Button } from 'react-bootstrap';
import AddBook from '../component/AddBook';
//import axios from "axios";

//const USER_API_BASE_URL = "http://localhost:8090";

class BookManager extends Component {

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            mode: '',
            open: false,
            auth : 'admin'
        }
    }

    addBook = () => {

        if (this.state.mode !== 'add') {
            this.setState({ mode: 'add' }, function () {
                if (this.state.open === false) {
                    this.setState({
                        open: true
                    });
                }
            });
        } else {
            this.setState({
                mode: '',
                open: false
            })
        }
    }

    // 권한에 따라 메뉴가 보이고 안보이고 함.
    authCheck = () => {
        if(this.state.auth==='user'){
            return(<div>유저입니다.</div>);
        }else if (this.state.auth==='admin'){
            return(
            <Container fluid><Button variant="outline-warning" onClick={this.addBook} style={bookAddBtn}>도서 추가</Button></Container>);
        }
    }

    // 현재 보이는 모드가 어떤거냐에 따라서 다른 컴포넌트들을 보여줌  
    modeCheck = () => {
        if(this.state.mode==='add' && this.state.open === true){
            return(<><AddBook/><Button variant="outline-warning" style={bookAddBtn}>등록</Button>
            <Button variant="outline-warning" style={bookAddBtn1}>취소</Button></>);
        }
    }

    render() {
        return (
            <div>
                <Container fluid>
                    {this.authCheck()}
                    {/* 권한에 따라 보이게 하고 안 보이게 하고 보이게 하고  */}
                    <Container>
                        {this.modeCheck()}
                    </Container>
                </Container>
            </div>
        );
    }

}

const bookAddBtn1 = {
    color: "rgb(90, 98, 104)",
    fontWeight: 'bold',
    border: "1.5px solid #ffc107",
    marginLeft: "10px"
}


const bookAddBtn =
{
    color: "rgb(90, 98, 104)",
    fontWeight: 'bold',
    border: "1.5px solid #ffc107"
}


export default BookManager;