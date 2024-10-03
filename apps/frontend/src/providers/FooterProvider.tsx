import React, { createContext, useContext, useReducer } from 'react';

// Define FooterState interface
interface FooterState {
  showFooter: boolean;
}

interface Action {
  type: string;
  payload?: any;
}

// Initial state
const initialState: FooterState = {
  showFooter: false,
};

// Create the context for FooterState and FooterDispatch
const FooterStateContext = createContext<FooterState>(initialState);
const FooterDispatchContext = createContext<React.Dispatch<Action> | undefined>(
  undefined
);

// FooterProvider component
function FooterProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <FooterStateContext.Provider value={state}>
      <FooterDispatchContext.Provider value={dispatch}>
        {children}
      </FooterDispatchContext.Provider>
    </FooterStateContext.Provider>
  );
}

// Reducer function to handle separate 'on_footer' and 'off_footer' actions
function reducer(state: FooterState, action: Action): FooterState {
  switch (action.type) {
    case 'on_footer':
      return { ...state, showFooter: true };
    case 'off_footer':
      return { ...state, showFooter: false };
    default:
      return state;
  }
}

// Hook to use the FooterState
function useFooterState(): FooterState {
  const context = useContext(FooterStateContext);
  if (context === undefined) {
    throw new Error('useFooterState must be used within a FooterProvider');
  }
  return context;
}

// Hook to use the FooterDispatch
function useFooterDispatch(): React.Dispatch<Action> {
  const context = useContext(FooterDispatchContext);
  if (context === undefined) {
    throw new Error('useFooterDispatch must be used within a FooterProvider');
  }
  return context;
}

// Action to turn the footer on
async function onFooter(dispatch: React.Dispatch<Action>) {
  try {
    dispatch({ type: 'on_footer' });
  } catch (error) {
    throw new Error('Failed to turn on footer');
  }
}

// Action to turn the footer off
async function offFooter(dispatch: React.Dispatch<Action>) {
  try {
    dispatch({ type: 'off_footer' });
  } catch (error) {
    throw new Error('Failed to turn off footer');
  }
}

export {
  FooterProvider,
  useFooterState,
  useFooterDispatch,
  onFooter,
  offFooter,
};
