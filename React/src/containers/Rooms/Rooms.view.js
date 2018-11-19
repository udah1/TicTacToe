import React, {Component} from 'react'
import {get_rooms, subscribe_events} from './Rooms.actions'
import {connect} from 'react-redux'
import {Modal, ModalHeader, ModalBody} from 'reactstrap';
import loader from "../../assets/img/loader.gif"

class Rooms extends Component {

    constructor(props) {
        super(props)
        this.socket = props.socket;
        this.props.getRooms(this.socket);
        props.subscribeEvents(this.socket);
    }

    render() {
        const {show, roomNumber, totalRooms, emptyRooms, joinRoom, createRoom} = this.props;
        return (
            <Modal isOpen={show}>
                <ModalHeader>Total Rooms :{totalRooms}</ModalHeader>
                <ModalBody>
                    <div className="container">
                        <div className="join-game" hidden={roomNumber > 0 ? true : false}>
                            <div className="room-list">
                                <h6 className="text-center">Available Rooms to Join</h6>
                                <ul className="nav nav-pills">
                                    {emptyRooms.map((number, key) => (
                                        <li className="nav-item room-number" key={number + "_" + key}>
                                            <a className="nav-link active" title={"Join room Number " + number}
                                               href="/#"
                                               onClick={(event) => {
                                                   joinRoom(this.socket, number);
                                               }}>
                                                #{number}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="create-room text-center">
                                <h5>
                                    <span>OR</span>
                                </h5>
                                <button className="btn btn-primary"
                                        onClick={(event) => {
                                            createRoom(this.socket);
                                        }}>
                                    Create New Room
                                </button>
                            </div>
                        </div>
                        <br />
                        <div hidden={roomNumber > 0 ? false : true}>
                            <h2 className="text-center">Waiting for player to join</h2>
                            <br />
                            <img className="game-loader" src={loader} alt="loading.."/>
                            <br />
                            <br />
                            <h6 className="text-center">You are in Room Number {roomNumber}, Tell your friend to join Room Number {roomNumber}</h6>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        );
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        getRooms: (socket) => dispatch(get_rooms(socket)),
        subscribeEvents: (socket) => dispatch(subscribe_events(socket))
    }
}

function mapStateToProps(state, props) {
    return {
        ...props,
        ...state.reducer.rooms
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Rooms)
