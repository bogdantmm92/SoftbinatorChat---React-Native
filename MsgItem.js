'use strict';

var React = require('react-native');

var {
  AppRegistry,
  TouchableHighlight,
  Image,
  StyleSheet,
  Text,
  View,
} = React;

var MsgItem = React.createClass({
  _renderMsgBody: function() {
    return (
      <View>
        <Text style={this.props.isSent ? styles.sentNameText : styles.receivedNameText}>
          {this.props.message.user.name}
        </Text>

        <TouchableHighlight style={ this.props.isSent ? styles.msgSentBody : styles.msgReceivedBody }
          underlayColor='#E6E6E6'
          onPress={ () => this.props.onMsgClick(this.props.message) } >

          <Text style={ this.props.isSent ? styles.msgSentText : styles.msgReceivedText }>
            { this.props.message.text }
          </Text>

        </TouchableHighlight>
      </View>
    );
  },

  _renderIcon: function(facebookId) {
    if (!this.props.isSent) {
      return (
        <Image
          style={ [styles.msgImage, styles.msgReceivedImage] }
          source={{uri: this.props.message.user.avatar}} />
      );
    }
  },

  render: function() {
    return  (
      <View style={ this.props.isSent ? styles.msgSentContainer : styles.msgReceivedContainer }>
        { this._renderMsgBody() }
        { this._renderIcon() }
      </View>
    );
  }
});

var styles = StyleSheet.create({
  msgSentContainer: {
    flex: 1,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 50,
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  msgReceivedContainer: {
    flex: 1,
    marginTop: 5,
    marginBottom: 5,
    marginRight: 50,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  msgSentBody: {
    marginRight: 20,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 15,
    backgroundColor: '#257DF7',
  },
  msgReceivedBody: {
    marginLeft: 35,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 15,
    backgroundColor: '#D0DBD1',
  },
  msgSentText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  msgReceivedText: {
    fontSize: 14,
    color: '#000000',
  },
  receivedNameText: {
    left: 44,
    fontSize: 8,
    color: '#BDBDBD',
  },
  sentNameText: {
    left: 8,
    fontSize: 8,
    color: '#BDBDBD',
  },
  msgImage: {
    width: 24,
    height: 24,
    borderRadius: 12
  },
  msgErrorImage: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 16,
    height: 16,
    borderRadius: 6
  },
  msgReceivedImage: {
    position: 'absolute',
    top: 12,
    left: 3,
  },
});

module.exports = MsgItem;
