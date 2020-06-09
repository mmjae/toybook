import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';
import BookManager from '../component/BookManager';
import Main from '../component/Main';
import UserManger from '../component/UserManager';

class AppRouter extends Component {

      state= {
         user : {}
     }

    render(){
    return (
        <div>
            <Switch>
                <Route exact path="/" component={Main} />
                <Route exact path="/book-manager"  render={BookManager}></Route>
                <Route exact path="/user-manager" render={()=><UserManger onChange={function(user){
                    this.props.onChange(user);
                }.bind(this)}/>}></Route>
            </Switch>
        </div>
        );
    }
}
export default AppRouter;