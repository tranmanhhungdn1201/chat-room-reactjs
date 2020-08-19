import PropTypes from 'prop-types';
import React from 'react';
import './ChatBox.scss';

ChatBox.propTypes = {
    messages: PropTypes.array,
    message: PropTypes.string,
    sendMessage: PropTypes.func,
    setMessage: PropTypes.func,
};

ChatBox.propTypes = {
    messages: [],
    message:'',
    sendMessage: null,
    setMessage: null,
};

function ChatBox({message, messages, sendMessage, setMessage}) {

    return (
        <div className="chatBox">
            <div className="chatBox__header">
                <h3>#room1</h3>
            </div>
            <div className="chatBox__content">
                {messages.map(mess => (
                    <div className="chatBox__msg">
                        <div className="msg__name">
                            <p>{mess.name}</p>
                        </div>
                        <div className="msg__content">
                            <p>
                                {mess.message}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="chatBox__message">
                <input
                    type="text"
                    value={message}
                    placeholder="Type a message"
                    onChange={({ target: { value } }) => setMessage(value)}
                    onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
                />
                <a href="#" className="chatBox__send" onClick={e => sendMessage(e)}>Send</a>
            </div>
        </div>
    );
}

export default ChatBox;