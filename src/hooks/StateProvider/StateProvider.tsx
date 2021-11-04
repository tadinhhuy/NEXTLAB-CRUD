import { createContext, useContext, useReducer } from 'react';

const StateContext = createContext({});

export const StateProvider = ({
  reducer,
  initialState,
  children,
}: {
  children: JSX.Element;
  initialState: object;
  reducer: any;
}) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateProvider = () => useContext(StateContext);
