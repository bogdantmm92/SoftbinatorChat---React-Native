'use strict';

var React = require('react-native');
var _ = require('underscore');

var TimerMixin = require('react-timer-mixin');

var MsgItem = require('./MsgItem');
var NiceButton = require('./NiceButton');
var NiceInput = require('./NiceInput');
var Profile = require('./Profile');

var Firebase = require('firebase');

var {
  AppRegistry,
  ListView,
  StyleSheet,
  Text,
  TextInput,
  AlertIOS,
  View,
} = React;

var ChatScreen = React.createClass({
  mixins: [TimerMixin],

  getInitialState: function() {
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.objectId !== r2.objectId
    });
    return {
      messages: [],
      dataSource: ds.cloneWithRows([]),
      userInput: "",
    };
  },

  componentDidMount: function() {
    this.firebaseRef = new Firebase("https://softbinator-chat.firebaseio.com/messages");
    // Get initial data from firebase
    this.firebaseRef.limitToLast(20).once('value', (snaps) => {
      var initialArray = _.map(snaps.val(), (data, key) => {
        var newMessage = data;
        newMessage.objectId = key;
        return newMessage;
      });
      // Set state with initial messages and then listen for updates
      this.setState({
        messages: initialArray,
        dataSource: this.state.dataSource.cloneWithRows(initialArray),
      },() => {
        this.setTimeout(() => jumpToEnd(this, React), 200);
        // Listen to messages
        var ignore = true;
        this.firebaseRef.limitToLast(1).on('child_added', (snapshot) => {
          // Ignore first message
          if (ignore) { ignore = false; return; }
          // Get message object from snapshot
          var newMessage = snapshot.val();
          newMessage.objectId = snapshot.key();

          // We shouldn't modify the state directly, so we copy the new array.
          var newArray = React.addons.update(this.state.messages, {$push: [newMessage]});

          this.setState({
            messages: newArray,
            dataSource: this.state.dataSource.cloneWithRows(newArray),
          });
          this.setTimeout(() => jumpToEnd(this, React), 200);
        });
      });
    });
  },

  _showKeyboard: function(show) {
    this.setState({keyboardUp: show});
    this.setTimeout(() => jumpToEnd(this, React), 200);
  },

  _onSendMsg: function() {
    var message = {
      text: this.state.userInput,
      user: this.props.user,
    }
    this.firebaseRef.push(message);

    this.setState({ userInput: "" });
  },

  _onMsgClick: function(message) {
    this.props.navigator.push({
      title: "Profile",
      component: Profile,
      passProps: {
        user: message.user,
      }
    });
    // AlertIOS.alert(
    //   "Click pe mesaj",
    //   null,
    //   [
    //     {text: "Ok", onPress: () => {}}
    //   ]
    // )
  },

  _renderItem: function(item) {
    return <MsgItem message={item}  onMsgClick={ this._onMsgClick } key={item.objectId} 
              isSent={this.props.user.objectId === item.user.objectId} />
  },

  _renderList: function() {
    return (
      <ListView
        ref={"listview"}
        dataSource={ this.state.dataSource }
        renderRow={ this._renderItem } />
    );
  },

  _renderInput: function() {
    return (
      <View style={styles.sendMsgContainer}>
        <NiceInput
          withStyle={{flex: 0.85, marginRight: 5}}
          onChangeText={ (text) => this.setState({ userInput: text }) }
          value={ this.state.userInput }
          placeholder="Send a message"
          onFocus={() => this._showKeyboard(true)}
          onEndEditing={() => this._showKeyboard(false)} />

        <NiceButton withStyle={{flex: 0.15}} name="Send" onPress={this._onSendMsg} />
      </View>
    );
  },

  render: function() {
    var keyboardSpace = this.state.keyboardUp ? 263 : 5;
    return (
      <View style={styles.fullContainer} >
        { this._renderList() }
        { this._renderInput() }
        <View style={{height: keyboardSpace}} />
      </View>
    );
  }
});

// Utility function
function jumpToEnd(component, React) {
  var RCTUIManager = require('NativeModules').UIManager;
  component.requestAnimationFrame(
    () => {
      RCTUIManager.measure(
        component.refs.listview.getScrollResponder().getInnerViewNode(),
        (x,y,width,inner_height) => {
          RCTUIManager.measure(
            React.findNodeHandle(component.refs.listview.getScrollResponder()),
            (x,y,width,outer_height) => {
              if (inner_height > outer_height) {
                var scrollTop = inner_height - outer_height - 1;
                component.refs.listview.getScrollResponder().scrollWithoutAnimationTo(scrollTop, 0)
                if (component.inner_height != inner_height) {
                  component.inner_height = inner_height;
                  component.requestAnimationFrame(() => { jumpToEnd(component, React); });
                }
              }
            }
          )
        }
      );
    }
  );
}

var styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
  },
  sendMsgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5,
    marginLeft: 5,
  },
});

module.exports = ChatScreen;
