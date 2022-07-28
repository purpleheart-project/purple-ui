import React, { useReducer } from 'react';
import routerConfig from './routers';
import { useRoutes } from 'react-router-dom';
import { initState, reducer } from './store';
import { useMount } from 'react-use';
import axios from 'axios';
export const GlobalContext = React.createContext<{ state: any; dispatch: any }>({});

const App: React.FC<any> = () => {
  const [state, dispatch] = useReducer(reducer, initState);
  const useRoutesRouterConfig = useRoutes(routerConfig);

  useMount(() => {
    axios({
      method: 'GET',
      url: '/api/vi/health',
    }).then((res) => {
      console.log(res);
    });
    // const a = new Error()
    // console.log(a)
  });

  return (
    <GlobalContext.Provider
      value={{
        state: state,
        dispatch: dispatch,
      }}
    >
      {useRoutesRouterConfig}
    </GlobalContext.Provider>
  );
};

export default App;
