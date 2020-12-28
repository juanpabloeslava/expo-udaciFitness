import { RECEIVE_ENTRIES, ADD_ENTRY } from '../actions/actionTypes'

const initialState = {}

const entries = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_ENTRIES :
      return {
        ...state,
        // spread all of the action keys into the new state object. We only have one key, but it's a safeguard in case more keys are added to it, they won't cause any trouble
        ...action.entries,
      }
    case ADD_ENTRY :
      return {
        ...state,
        ...action.entry
      }
    default :
      return state
  }
}

export default entries