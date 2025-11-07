// export const useAuth = () => {
//     const signIn = () => localStorage.setItem("isAuthenticated", "true")

//     const signOut = () => localStorage.removeItem("isAuthenticated")

//     const isLogged = () => localStorage.getItem("isAuthenticated") === "true"

//     return { signIn, signOut, isLogged }
// }

// export type AuthContext = ReturnType<typeof useAuth>

export const useAuth = () => {
  if (typeof window === 'undefined') {
    return undefined;
  }

  const signIn = () => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('isAuthenticated', 'true');
    }
  };

  const signOut = () => {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('isAuthenticated');
    }
  };

  const isLogged = () => {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('isAuthenticated') === 'true';
    }
    return false;
  };

  return { signIn, signOut, isLogged };
};

export type AuthContext = ReturnType<typeof useAuth>;