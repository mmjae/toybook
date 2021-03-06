import React from 'react';
import { Route, Switch } from 'react-router-dom';
import BookManager from '../component/BookManager';
import Main from '../component/Main';
import UserManager from '../component/UserManager';

const AppRouter = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={Main} />
                <Route exact path="/book-manager"  component={BookManager}></Route>
                <Route exact path="/user-manager" component={UserManager}></Route>
            </Switch>
        </div>
        );
}
export default AppRouter;