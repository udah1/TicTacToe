import React, {Component} from 'react'
import {connect}    from 'react-redux'
import {subscribe_events, play_move} from './Board.actions'

class Board extends Component {

    constructor(props) {
        super(props);
        this.title = "Realtime Tic Tac Toe Using REACT!!!! & Socket.IO";
        this.gamePlainGrid = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
        this.socket = props.socket;
        props.subscribeEvents(this.socket, props);
    }

    renderPlayedText = (number) => {
        return this.props.gameGrid[number] || ''
    };

    render() {
        const {roomNumber, sign, myTurn, playMove} = this.props;

        return (
            <div className="container">
                <div className="row heading-row">
                    <div className="col-md-12 text-center app-heading">
                        <h2>{this.title}</h2>
                    </div>
                    <div className="col-md-6 text-center">
                        <div className={"player-heading" + ((myTurn && sign === 'X') || (!myTurn && sign === 'O') ? ' current-player' : '')}>
                            Player 1
                        </div>
                    </div>
                    <div className="col-md-6 text-center">
                        <div className={"player-heading" + ((myTurn && sign === 'O') || (!myTurn && sign === 'X') ? ' current-player' : '')}>
                            Player 2
                        </div>
                    </div>
                </div>
                <div className="row game-row">
                    <div className="text-center game-container">
                        <table id="game" className="game-grid">
                            <tbody>
                            {this.gamePlainGrid.map((item, key) => (
                                <tr key={"tr-" + key}>
                                    {item.map((number, key2) => (
                                        <td className={"grid-" + number} id={"grid-" + number} key={"td-" + key + key2}
                                            onClick={() => playMove(this.socket, number, this.props)}>
                                            {this.renderPlayedText(number)}
                                        </td>
                                    ))}
                                </ tr>
                            ))}
                            </tbody>
                        </table>
                        <p />
                        <h6 className="text-center">You are in Room Number {roomNumber}.</h6>
                    </div>
                </div>
            </div>

        );
    }
}


function mapDispatchToProps(dispatch) {
    return {
        subscribeEvents: (socket, props) => dispatch(subscribe_events(socket, props.sign)),
        playMove: (socket, number, props) => dispatch(play_move(socket, number, props))
    }
}

function mapStateToProps(state) {
    return {
        ...state.reducer.board
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)
