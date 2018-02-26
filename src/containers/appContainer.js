import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import axios from 'axios';
import App from '../components/app';
import {store} from '../index';
import {loggedInUser, showLoader, showErrorMsg, setPlanetList} from '../actions/index';

const checkValidUser = (validUsers, name, pass) => {

    for (var item in validUsers) {
        if (validUsers[item].name.toLowerCase() === name.toLowerCase() && validUsers[item].pass === pass) {
            return true;
        }
    }
    return false;
};

const mapStateToProps = (state) => {
    let isloggedIn = state.login.loggedInUser;
    let showLoader = state.login.showLoader;
    let showError = state.login.showError;
    let planetList = state.planets.list;
    let showNoResultError: state.planets.showNoResultError;

    return {
        isloggedIn: isloggedIn,
        showLoader: showLoader,
        showError: showError,
        planetList: planetList,
        showNoResultError: showNoResultError
    }
};

const mapDispatchToProps = (dispatch) => {

    const login = async (e) => {

        e.preventDefault();
        let state = store.getState();
        dispatch(showLoader(true));
        let validUsers = await getUserDetails();
        let userInfo = state.form.loginForm && state.form.loginForm.values;
        let name = userInfo.username;
        let pass = userInfo.pwd;
        checkValidUser(validUsers, name, pass) ? dispatch(loggedInUser(true)) : dispatch(showErrorMsg(true));
        dispatch(showLoader(false));

    };

    const planetSearch = _.debounce((item)=> {search(item)}, 1000);

    const submitHandler = (e) => {
        e.preventDefault();
        let state = store.getState();
        let searchText = state.form.searchForm && state.form.searchForm.values && state.form.searchForm.values.query;
        search(searchText);
    };
    const search = async (text) => {
        let planetList = [];
        let count = 1;
        let request;
        let response;
        if (text) {
            try {
                while (1) {
                    request = await axios({
                        url: `https://swapi.co/api/planets/?page=${count++}`
                    });
                    response = request.data;
                    if (!response.next) {
                        break;
                    }
                    response.results.forEach((item)=> {
                        if (item.name.toLowerCase().includes(text.toLowerCase())) {
                            planetList.push(item);
                        }

                    });
                }
                dispatch(setPlanetList(planetList));
            } catch (e) {
                console.log(e)
            }

        }

    };

    const getUserDetails = async () => {
        let validUsers = [];
        let count = 1;
        let request;
        let response;
        while(1){
            request = await axios({
                url: `https://swapi.co/api/people/?page=${count++}`
            });
            response = request.data;
            if (!response.next) {
                break;
            }
            response.results.forEach((item)=> {
                validUsers.push({name: item.name, pass: item.birth_year})
            });
        }
        return validUsers;
    };

    return {
        login: login,
        planetSearch: planetSearch,
        submitHandler: submitHandler
    }
};

class AppContainer extends Component {

    render() {
        return (
            <App {...this.props}/>
        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);