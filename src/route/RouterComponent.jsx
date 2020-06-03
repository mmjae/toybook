import React from 'react';
import{Route, Switch} from 'react-router-dom';
import BookManager from '../component/BookManager';
import Main from '../component/Main';
const AppRouter= () => {
    return(
                    <div>
                        <Switch>
                            <Route exact path="/" component={Main}/>
                            <Route exact path="/book-manager" component={BookManager}></Route>
                        </Switch>
                    </div>
    );
}
export default AppRouter;