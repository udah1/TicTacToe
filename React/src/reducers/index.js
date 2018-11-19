import { combineReducers } from 'redux'

import board from '../containers/Board/Board.reducer'
import rooms from '../containers/Rooms/Rooms.reducer'
import main from '../containers/Main/Main.reducer'

const rootReducer = combineReducers({
  reducer : combineReducers({ //nesting reducers...
      board,
      rooms,
      main
  })
  //place other reducers and nested reducers here...
})

export default rootReducer

