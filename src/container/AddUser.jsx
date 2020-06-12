import AddUser from '../component/AddUser';
import {connect} from 'react-redux';

const mapDispatchToProps = (dispatch) =>{
    var tuser = {}
    return {
        onChange : function(username,password,age,type){
            if(username !== null){
                tuser.username = username;
            }else if (password !== null){
                tuser.password = password;
            } else if (age !== null){
                tuser.age = age;
            }
            if(type==='reset'){
                tuser.username = '';
                tuser.password = '';
                tuser.age = '';
            }
            dispatch({type : 'TEMPO' , tuser : tuser})
        }
    }
}

export default connect(null,mapDispatchToProps)(AddUser);
