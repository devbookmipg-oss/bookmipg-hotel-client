export const authReducer = (state, action) => {
  switch (action.type) {
    case 'AUTH_LOADING':
      return {
        ...state,
        loading: true,
        user: null,
        error: null,
      };

    case 'LOGIN_SUCCESS':
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        error: null,
      };

    case 'LOGIN_FAILED':
      return {
        ...state,
        loading: false,
        user: null,
        error: action.payload,
      };

    case 'SIGNUP_SUCCESS':
      return {
        ...state,
        loading: false,
        user: null,
        error: null,
      };

    case 'SIGNUP_FAILED':
      return {
        ...state,
        loading: false,
        user: null,
        error: action.payload,
      };
    case 'AUTH_RESET':
      return {
        loading: false,
        user: null,
        error: null,
      };

    default:
      return {
        ...state,
      };
  }
};
