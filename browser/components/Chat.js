import React, { Component } from 'react';
import { connect } from 'react-redux';
import socket from '../socket';
import { startChat, stopChat } from '../reducers/gameState';



class Chat extends Component {
  constructor(props){
    super(props);
    this.state = {
      message: ''
    };
    this.updateMessage = this.updateMessage.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  componentWillUpdate(){
      this.refs.messageBox.scrollTop = this.refs.messageBox.scrollHeight;
  }


  updateMessage(evt) {
    this.setState({ message: evt.target.value });
  }

  sendMessage() {
    let socketId = localStorage.getItem('mySocketId');
    if (this.state.message) {
      socket.emit('newMessage', this.state.message, socketId);
      this.setState({ message: '' });
    }
  }

  render() {
    return (
      <div id="chat-box">
          <div id="message-box">
            <ul ref="messageBox"
                id="message-list"
                className="collection">
              { this.props.messages && this.props.messages.map((message, i) => {
                  return (
                    <li key={i} className="message-item">
                      {`${message.name}:   ${message.text}`}
                    </li>
                  )
              })}
            </ul>
          </div>
          <input
            ref="chatInput"
            value={this.state.message}
            onChange={this.updateMessage}
            onKeyPress={evt => { if (evt.key === 'Enter') this.sendMessage(); }}
            maxLength={70}
            type="text"
            id="chat-bar"
            placeholder="press 'enter' to send" />
      </div>
      );
  }
}

const mapStateToProps = ({ messages, gameState }) => ({ messages, gameState });

const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);
