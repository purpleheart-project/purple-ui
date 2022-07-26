import React, { useReducer } from 'react';
import routerConfig from './routers';
import { useRoutes } from 'react-router-dom';
import { initState, reducer } from './store';
export const GlobalContext = React.createContext<{ state: any; dispatch: any }>({});

const App: React.FC<any> = () => {
  const [state, dispatch] = useReducer(reducer, initState);
  const useRoutesRouterConfig = useRoutes(routerConfig);

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
