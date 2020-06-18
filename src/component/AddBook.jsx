import React , {Component}  from 'react';
import {Table} from 'react-bootstrap';

class AddBook extends Component{

    render() {
        return (
            <div>
                <Table responsive>
                    <tbody>
                        <tr>
                            <td>
                                <input type="file"/>
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