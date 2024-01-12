import { CONSTANTS } from './constants';
/** user action */
export const saveCurrentUser = (data) => {
  return {
    type: CONSTANTS.GET_CURRENT_USER,
    payload: data,
  };
};
