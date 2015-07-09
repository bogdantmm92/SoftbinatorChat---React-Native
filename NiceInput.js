'use strict';

var React = require('react-native');

var {
  AppRegistry,
  TextInput,
  StyleSheet,
} = React;

var NiceInput = React.createClass({
	render: function() {
		return (
			<TextInput
				{...this.props}
        style={[styles.textInput, this.props.withStyle]}
        autoCapitalize="sentences"
        placeholderTextColor="#D1D1D1"
        autoFocus={ true } />
      );
	}
});

var styles = StyleSheet.create({
	textInput: {
		color: '#000000',
	  fontSize: 17,
	  height: 36,
	  padding: 7,
	  borderRadius: 4,
	  borderColor: '#cccccc',
	  borderWidth: 1,
	  // marginBottom: 5
	}
});

module.exports = NiceInput;