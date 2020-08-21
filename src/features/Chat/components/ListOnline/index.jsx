import React from 'react';
import PropTypes from 'prop-types';
import './ListOnline.scss';

ListOnline.propTypes = {
    users: PropTypes.array,
};

ListOnline.defaultProps = {
    users: []
};

function ListOnline({users}) {
    return (
        <>
            {
                users.length && (
                <div className="listOnline">
                    <h3>Online</h3>
                    <ul>
                        {
                            users.map(user => <li key={user._id}><span className="listOnline__dot"></span>{user.user.name}</li>)
                        }
                    </ul>
                </div>
                )
            }
        </>
    );
}

export default ListOnline;