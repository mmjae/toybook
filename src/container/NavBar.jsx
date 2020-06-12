import {connect} from 'react-redux';
import NavBar from '../component/NavBar';

const mapStateToProps = (state) =>{
    return {
        tuser : state.tuser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
       tUserDelete : function(){dispatch({type : 'TEMPO' , tuser : {}})}
    }
}



export default connect(mapStateToProps,mapDispatchToProps)(NavBar);