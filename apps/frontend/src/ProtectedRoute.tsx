import { Navigate } from 'react-router-dom';
import { RedirectToSignIn, useUser } from '@clerk/clerk-react';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();

  if (!user) {
    return <RedirectToSignIn />;
  }

  return <>{children}</>;
};
