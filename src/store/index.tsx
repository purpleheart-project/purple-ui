export const initState = {
  userinfo: {
    email: localStorage.getItem('email'),
  },
  isLogin: localStorage.getItem('email') ? true : false,
};
export const reducer = (prevState:any, action:any) => {
  const newState = { ...prevState };
  switch (action.type) {
    case 'login':
      newState.userinfo.email = action.payload;
      newState.isLogin = true;
      return newState;
    default:
      return newState;
  }
};
