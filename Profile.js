'use strict';

var React = require('react-native');

var MsgItem = require('./MsgItem');
var NiceButton = require('./NiceButton');
var NiceInput = require('./NiceInput');

var Firebase = require('firebase');

var {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
} = React;

var Profile = React.createClass({
  render: function() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={{alignItems: 'center'}}>
        <Image style={styles.msgImage} source={{uri: this.props.user.avatar}} />
        <Text style={styles.textLabel}>{this.props.user.name}</Text>
      </ScrollView>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  msgImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  textLabel: {
    color: '#48BBEC',
    fontSize: 17,
    marginTop: 60,
    marginBottom: 7,
    fontWeight: '500'
  },
});

module.exports = Profile;
