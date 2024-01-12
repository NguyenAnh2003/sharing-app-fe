import { CONSTANTS } from './constants';

const initValue = {
  /** init user state */
  /** Storing currentUserId */
  currentUser: {
    userId: '',
  },
};

const rootReducer = (state = initValue, action) => {
  console.log({ state, action });
  switch (action.type) {
    case CONSTANTS.GET_CURRENT_USER:
      /** action of authenticate */
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          userId: action.payload,
        },
      };

    default:
      /** if not any sastisfy action type return init state*/
      return state;
  }
};

export default rootReducer;
