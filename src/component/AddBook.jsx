import React , {Component}  from 'react';
import {Table} from 'react-bootstrap';

class AddBook extends Component{

    constructor(props){
        super(props)
        this.state ={
            imgBase64 : '',
            setImgBase64 : '',
            imgFile : '',
            setImgFile : ''
        }
    }
    handleChangeFile= (e) => {
        let reader = new FileReader();

        if(e.target.files[0].type!=='image/png'){
            alert('png파일만 업로드 할 수 있습니다.');
            e.target.value="";
            this.setState({
                imgBase64 : ""
            });
            return;
        }

        reader.onloadend = () =>{
            const base64= reader.result;
            if(base64){
                this.setState({
                    imgBase64 : base64.toString()
                });
            }
           
        }
        if(e.target.files[0]){
            reader.readAsDataURL(e.target.files[0]);
            this.setState({
                imgFile : e.target.files[0]
            })
        }
    }

    imgSet = () =>{
        if(this.state.imgBase64!==''){
            return( <img style={style} src={this.state.imgBase64} alt='bookImg'/> );
        }else {
            return(null);
        }
    }


    render() {
        return (
            <div>
                <div>
                    {this.imgSet()}
                </div>
                <Table responsive>
                    <tbody>
                        <tr>
                            <td>
                                {/* 이미지 미리보기 파일 제한해야함 */}
                                <input type="file" name="imgFile" id="imgFile" onChange={this.handleChangeFile} accept=".png"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                            <input type="text" placeholder="도서 제목" style={style2}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                            <input type="text" placeholder="대여 가격" style={style2}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                            <input type="text" placeholder="구매 가격" style={style2} />
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        );
    }

}
const style = {
    width : "250px",
    height : "150px"
}

const style2 = {
    width : "550px",
    height : "40px",
    borderRadius: "9px",
    fontSize : "16px",
    fontWeight : "bold"
}

export default AddBook