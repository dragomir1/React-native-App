import { TRY_AUTH } from './actionTypes';


// getting authdata whether we're logging in or signing up.
export const tryAuth = (authData) => {
  return {
    type: TRY_AUTH,
    authData: authData
  };
};
