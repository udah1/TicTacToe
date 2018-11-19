import React, {Component} from 'react';
import {Provider} from 'react-redux'
import './assets/bootstrap/css/bootstrap.min.css';
import './App.css';
import Main from './containers/Main/Main.view'
import rootReducer from './reducers'
import {applyMiddleware, createStore} from 'redux'
import thunk from "redux-thunk";

const store = createStore(rootReducer, {reducer: {}}, applyMiddleware(thunk));

class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <div>
                    <Main/>
                </div>
            </Provider>
        );
    }
}


export default App;
