import * as io from 'socket.io-client';
import React, {Component} from 'react';
import Board from '../Board/Board.view'
import Rooms from '../Rooms/Rooms.view'
import {subscribe_events, join_room, create_new_room} from './Main.actions'
import {connect}    from 'react-redux'

class Main extends Component {

    constructor(props) {
        super(props)
        this.socket = io('localhost:4000', { wsEngine: 'uws' });
        props.subscribeEvents(this.socket);
    }

    render() {
        const {roomNumber, joinRoom, createRoom, show, myTurn, sign} = this.props;

        return (
            <div>
                <Board roomNumber={roomNumber} socket={this.socket} myTurn={myTurn} sign={sign} />
                <Rooms show={show} socket={this.socket} joinRoom={joinRoom} createRoom={createRoom} roomNumber={roomNumber} />
            </div>
        );
    }
}


function mapDispatchToProps(dispatch, ownProps) {
    return {
        subscribeEvents: (socket) => dispatch(subscribe_events(socket)),
        joinRoom: (socket, id) => dispatch(join_room(socket, id)),
        createRoom: (socket) => dispatch(create_new_room(socket))
    }
}

function mapStateToProps(state) {
    return {
        ...state.reducer.main
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Main);
