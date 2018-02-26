import React, { Component } from 'react';
import Login from '../components/login';
import SearchPage from '../components/searchPage';

export default class App extends Component {

    render() {
        return (
            <div>
                {this.props.isloggedIn ? <SearchPage {...this.props}/> : <Login {...this.props}/>}
            </div>
        );
    }
}