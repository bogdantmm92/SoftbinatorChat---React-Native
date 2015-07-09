'use strict';

var React = require('react-native');
var _ = require('underscore');

var RegisterForm = require('./RegisterForm');
var ChatScreen = require('./ChatScreen');

var Firebase = require('firebase');

var {
  AppRegistry,
  StyleSheet,
  View,
  NavigatorIOS
} = React;

var SoftbinatorChat = React.createClass({
  getInitialState: function() {
    return {
      formCompleted: false,
      user: null,
    }
  },
  
  _onFormCompleted: function(userData) {
    this.firebaseRef = new Firebase("https://softbinator-chat.firebaseio.com/users");
    var newUserRef = this.firebaseRef.push(userData);

    this.setState({
      formCompleted: true,
      user: {
        name: userData.name,
        avatar: userData.avatar,
        objectId: newUserRef.key(),
      }
    });
  },

  _renderChat: function() {
    return (
      <NavigatorIOS 
        style={styles.container}
        initialRoute={{
          component: ChatScreen,
          title: "Softbinator group chat",
          passProps: { user: this.state.user},
        }} />
    );
  },

  _renderRegisterForm: function() {
    return ( <RegisterForm onFormCompleted={this._onFormCompleted} /> );
  },

  render: function() {
    if (this.state.formCompleted) {
      return this._renderChat();
    } else {
      return this._renderRegisterForm();
    }
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

AppRegistry.registerComponent('SoftbinatorChat', () => SoftbinatorChat);
