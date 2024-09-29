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
  showFooter: true,
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

// Reducer function to toggle showFooter
function reducer(state: FooterState, action: Action): FooterState {
  switch (action.type) {
    case 'toggle_footer':
      return { ...state, showFooter: !state.showFooter };
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

// Action to toggle the footer visibility
async function toggleFooter(dispatch: React.Dispatch<Action>) {
  try {
    dispatch({ type: 'toggle_footer' });
  } catch (error) {
    throw new Error('Failed to toggle footer visibility');
  }
}

export { FooterProvider, useFooterState, useFooterDispatch, toggleFooter };
