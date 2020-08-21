import PropTypes from 'prop-types';
import React from 'react';
import './ChatBox.scss';
import { getCurrentUser } from 'utils/auth';

ChatBox.propTypes = {
    room: PropTypes.object,
    messages: PropTypes.array,
    message: PropTypes.string,
    sendMessage: PropTypes.func,
    setMessage: PropTypes.func,
};

ChatBox.defaultProps = {
    room: {},
    messages: [],
    message:'',
    sendMessage: null,
    setMessage: null,
};

function ChatBox({room, message, messages, sendMessage, setMessage}) {
    const user = getCurrentUser();

    return (
        <div className="chatBox">
            <div className="chatBox__header">
            <h3>#{room?.name}</h3>
            </div>
            <div className="chatBox__content">
                {messages.map(mess => {
                    return mess.name === 'admin' ?
                    <div key={mess._id} className="chatBox__msg chatBox__admin">
                        <div className="msg__admin">
                            <p>
                                {mess.message}
                            </p>
                        </div>
                    </div>
                    :
                    (user._id !== mess.userId) ?
                    <div key={mess._id} className="chatBox__msg">
                        <div className="msg__name">
                            <p>{mess.name}</p>
                        </div>
                        <div className="msg__content">
                            <p>
                                {mess.message}
                            </p>
                        </div>
                    </div>
                    :
                    <div key={mess._id} className="chatBox__msg chatBox__outgoing">
                        <div className="msg__content">
                            <p>
                                {mess.message}
                            </p>
                        </div>
                    </div>
                })}
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