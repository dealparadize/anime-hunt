import { User } from "../types/User";
import { v4 } from "uuid";

const LS_USER_ITEM = "LS_USER_ITEM";
const LS_FAVS_SUFFIX = "LS_FAVS_SUFFIX";

const login: ({
  user,
  password,
}: {
  user: string;
  password: string;
}) => Promise<User> = async ({ user, password }) => {
  const loggedUserFavs = JSON.parse(
    localStorage.getItem(`${user}-${LS_FAVS_SUFFIX}`) || "[]"
  );
  const loggedUser = {
    user: user,
    id: v4(),
    favorites: loggedUserFavs || [],
  };

  localStorage.setItem(LS_USER_ITEM, JSON.stringify(loggedUser));

  return loggedUser;
};

const logout = async () => {
  localStorage.removeItem(LS_USER_ITEM);
};

const checkSession: () => Promise<User> = async () => {
  const lsUser = localStorage.getItem(LS_USER_ITEM);

  if (!lsUser) throw new Error("No currently user session");

  return JSON.parse(lsUser) as User;
};

const setFavs: ({ user }: { user: User }) => void = async ({ user }) => {
  localStorage.setItem(
    `${user?.user}-${LS_FAVS_SUFFIX}`,
    JSON.stringify(user.favorites)
  );

  localStorage.setItem(LS_USER_ITEM, JSON.stringify(user));
};

export default {
  login,
  logout,
  checkSession,
  setFavs,
};
