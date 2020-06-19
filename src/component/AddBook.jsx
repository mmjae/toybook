import React , {Component}  from 'react';
import {Table} from 'react-bootstrap';

class AddBook extends Component{

    constructor(props){
        super(props)
        this.state ={
            imgBase64 : '',
            setImgBase64 : '',
            imgFile : '',
            setImgFile : '',
        }
    }
    handleChangeFile= (e) => {
        let reader = new FileReader();

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
            return( <img src={this.state.imgBase64} alt='bookImg'/> );
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
                                <input type="file" name="imgFile" id="imgFile" onChange={this.handleChangeFile} accept="image/jpg,.jpg"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                            <input type="text" placeholder="도서 제목"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                            <input type="text" placeholder="대여 가격"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                            <input type="text" placeholder="구매 가격"/>
                            </td>
                        </tr>

                    </tbody>
                </Table>
            </div>
        );
    }

}
export default AddBook