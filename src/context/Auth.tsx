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
import api from "../api/api";
// import * as sessionsApi from "./api/sessions";
// import * as usersApi from "./api/users";

interface AuthContextType {
  user?: User;
  loading: boolean;
  error?: any;
  login: (user: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  addFav: (id: string) => Promise<void>;
  removeFav: (id: string) => Promise<void>;
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
    api
      .checkSession()
      .then((user) => setUser(user))
      .catch((_error) => {})
      .finally(() => setLoadingInitial(false));
  }, []);

  // login handler
  const login = async (user: string, password: string) => {
    setLoading(true);

    api
      .login({ user, password })
      .then((user) => {
        setUser(user);
        navigate("/");
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  // login handler
  const logout = async () => {
    api.logout().then(() => setUser(undefined));
  };

  const addFav = async (id: string) => {
    setUser({ ...user, favorites: [...(user?.favorites ?? []), id] } as User);
    api.setFavs({ user });
  };

  const removeFav = async (id: string) => {
    setUser({
      ...user,
      favorites: (user?.favorites ?? []).filter((fav) => fav !== id),
    } as User);
    api.setFavs({ user });
  };

  // Avoiding useless re-renders
  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      error,
      login,
      logout,
      addFav,
      removeFav,
    }),
    [user, loading, error]
  );

  if (loadingInitial) return <></>;

  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  );
}

// Export the `useAuth` hook instead of the context
export default function useAuth() {
  return useContext(AuthContext);
}
