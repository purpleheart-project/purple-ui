import { GlobalContext } from '../App';
import { useContext } from 'react';

const Admin = () => {
  const { state } = useContext(GlobalContext);
  return (
    <div>
      Admin111
      {JSON.stringify(state.isLogin)}
      {state.userinfo.email}
    </div>
  );
};

export default Admin;
