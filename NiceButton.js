'use strict';

var React = require('react-native');

var {
  AppRegistry,
  TouchableHighlight,
  StyleSheet,
  Text,
} = React;

var NiceButton = React.createClass({
  _onPress: function() {
    if (!this.props.disabled) {
      this.props.onPress();
    }
  },
	render: function() {
		return (
			<TouchableHighlight 
        style={[styles.button, this.props.withStyle, this.props.disabled ? styles.disabled: {}]} 
        onPress={this._onPress} 
        underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>{this.props.name}</Text>
        </TouchableHighlight>
      );
	}
});

var styles = StyleSheet.create({
	buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    // marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  disabled: {
    backgroundColor: '#93C0C9',
    borderColor: '#93C0C9',
  }
});

module.exports = NiceButton;