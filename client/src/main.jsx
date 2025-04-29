import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from "react-redux";
import { appStore } from './app/store.js';
import { Toaster } from 'sonner';
import { useLoadUserQuery } from '@/features/api/authApi';
import LoadingSpinner from './components/LoadingSpinner';

const Custom = ({ children }) => {
  const { isLoading, isSuccess, isError, refetch } = useLoadUserQuery(undefined, {
    refetchOnMountOrArgChange: false,
    refetchOnFocus: false,
    refetchOnReconnect: false,
  });

  useEffect(() => {
    // Optional: You can manually trigger a refetch only if needed
    // refetch();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <div>Error loading user. Please refresh.</div>;
  }

  return <>{children}</>;
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={appStore}>
      <Custom>
        <App />
      </Custom>
      <Toaster />
    </Provider>
  </StrictMode>,
);
