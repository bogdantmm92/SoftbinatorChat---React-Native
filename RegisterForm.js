'use strict';

var React = require('react-native');
var _ = require('underscore');

var NiceButton = require('./NiceButton');
var NiceInput = require('./NiceInput');

var {
  AppRegistry,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  Image,
  Text,
  ScrollView,
  View,
} = React;

var RegisterForm = React.createClass({
	getInitialState: function() {
		return {
			formNumber: 0,
			userName: '',
			avatar: '',
			avatarsList: [
				'http://icons.iconarchive.com/icons/iconka/buddy/128/officer-man-icon.png',
				'http://icons.iconarchive.com/icons/iconka/buddy/128/angel-icon.png',
				'http://icons.iconarchive.com/icons/iconka/buddy/128/alien-female-icon.png',
				'http://icons.iconarchive.com/icons/aha-soft/free-large-boss/512/Admin-icon.png',
				'http://icons.iconarchive.com/icons/iconka/buddy/128/airhostess-woman-icon.png',
				'http://icons.iconarchive.com/icons/iconka/buddy/128/nurse-girl-icon.png',
			],
		}
	},

	_onContinue: function() {
		if (this.state.formNumber === 1) {
			this.props.onFormCompleted({
				name: this.state.userName,
				avatar: this.state.avatar,
			});
		} else {
			this.setState({formNumber: this.state.formNumber + 1});
		}
	},


	_onAvatarPick: function(avatar) {
		this.setState({avatar: avatar});
	},

	_renderNamePick: function() {
		return (
			<ScrollView style={styles.container} contentContainerStyle={{alignItems: 'center'}}>
				<Text style={styles.textLabel}>Your name</Text>

				<NiceInput
	          withStyle={{marginLeft: 50, marginRight: 50, marginBottom: 10}}
	          onChangeText={ (text) => this.setState({ userName: text }) }
	          value={ this.state.userName }
	          placeholder="Type your name" />

	      <NiceButton 
	      	disabled={this.state.userName.length === 0 ? true : false}
	      	withStyle={{marginLeft: 50, marginRight: 50}}
	      	name="Continue" onPress={this._onContinue} />
	    </ScrollView>
		);
	},

	_renderAvatarPick: function() {
		return (
			<ScrollView style={styles.container} contentContainerStyle={{alignItems: 'center'}}>
				<Text style={styles.textLabel}>Pick your avatar</Text>

				{_.map(this.state.avatarsList, (avatar) => {
					return (
						<TouchableHighlight style={avatar === this.state.avatar ? styles.selected : {}}
							underlayColor='#99d9f4'
							onPress={() => this._onAvatarPick(avatar) }>
							<Image
			          style={styles.image}
			          source={{uri: avatar}} />
						</TouchableHighlight>
					);
				})}

	      <NiceButton 
	      	disabled={this.state.avatar.length === 0 ? true : false}
	      	withStyle={{marginLeft: 50, marginRight: 50}}
	      	name="Continue" onPress={this._onContinue} />
	    </ScrollView>
		);
	},

	render: function() {
		if (this.state.formNumber === 0) {
			return this._renderNamePick();
		} else {
			return this._renderAvatarPick();
		}
	}
});

var styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	textLabel: {
    color: '#48BBEC',
    fontSize: 17,
    marginTop: 60,
    marginBottom: 7,
    fontWeight: '500'
  },
  image: {
  	width: 50, 
  	height: 50
  },
  selected: {
  	borderWidth: 2,
  	borderColor: '#99d9f4',
  }
});

module.exports = RegisterForm;