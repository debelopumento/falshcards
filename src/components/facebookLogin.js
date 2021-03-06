import React from "react";
import FacebookLogin from "react-facebook-login";
import store from "../store";
import * as actions from "../actions/actionIndex";

const responseFacebook = response => {
    const facebookId = response.id;
    //store.dispatch({ type: 'LOGIN', payload: null });
    store.dispatch(actions.updateFacebookId(facebookId));
    store.dispatch(actions.lookupUser(facebookId));
};

const FacebookLoginButton = () => (
    <FacebookLogin
        appId="1914617068781649"
        autoLoad={true}
        fields="name,email,picture"
        callback={responseFacebook}
        icon="fa-facebook fa-lg"
    />
);

export default FacebookLoginButton;
