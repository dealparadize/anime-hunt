import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { User } from "../types/User";
// import * as sessionsApi from "./api/sessions";
// import * as usersApi from "./api/users";

interface AuthContextType {
  user?: User;
  loading: boolean;
  error?: any;
  login: (user: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// Export the provider as we need to wrap the entire app with it
export function AuthProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [user, setUser] = useState<User>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingInitial, setLoadingInitial] = useState<boolean>(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (error) setError(null);
  }, [location.pathname]);

  // check if there is a currently active session

  useEffect(() => {
    // usersApi
    //   .getCurrentUser()
    //   .then((user) => setUser(user))
    //   .catch((_error) => {})
    //   .finally(() => setLoadingInitial(false));
  }, []);

  // login handler
  const login = (user: string, password: string) => {
    setLoading(true);

    // sessionsApi
    //   .login({ email, password })
    //   .then((user) => {
    //     setUser(user);
    //     navigate("/");
    //   })
    //   .catch((error) => setError(error))
    //   .finally(() => setLoading(false));
  };

  // login handler
  const logout = () => {
    // sessionsApi.logout().then(() => setUser(undefined));
  };

  // Avoiding useless re-renders
  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      error,
      login,
      logout,
    }),
    [user, loading, error]
  );

  if (!loadingInitial) return <></>;

  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  );
}

// Export the `useAuth` hook instead of the context
export default function useAuth() {
  return useContext(AuthContext);
}
