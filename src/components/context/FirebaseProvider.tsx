import {createContext, FC, useCallback, useContext, useEffect, useMemo, useState} from "react";
import {getIdToken, onAuthStateChanged, signInWithEmailAndPassword, signOut, User} from 'firebase/auth'
import {FirebaseError, IFirebaseProvider, IFirebaseProviderHooks, JwtToken} from "types";
import jwt_decode from 'jwt-decode'
import {AuthPrivilege} from "types/auth";

const FirebaseContext = createContext<IFirebaseProviderHooks>({} as IFirebaseProviderHooks)

const FirebaseProvider: FC<IFirebaseProvider> = ({ auth, children }) => {
  const [user, setUser] = useState<User>()
  const [token, setToken] = useState("")
  const [authenticated, setAuthenticated] = useState<boolean>(false)
  const [error, setError] = useState<FirebaseError>(FirebaseError.NONE)

  const getUserIdToken = useCallback(async (user: User) => {
    return await getIdToken(user)
  }, [])

  const validateToken = useCallback(async (user: User) => {
    const token = await getUserIdToken(user)
    const decoded = jwt_decode<JwtToken>(token)

    setToken(token)
    // filter accounts from staging vs prod API
    if (decoded.iss && decoded.iss.includes("hackpsu18")) {
      // TeamMember permissions == 2
      if (decoded.privilege && decoded.privilege >= AuthPrivilege.TEAM) {
        return true
      }
    }
    setError(FirebaseError.NO_PERMISSION)
    return false
  }, [])

  const validatePermissions = useCallback( (privilege: number) => {
    if (token) {
      const decoded = jwt_decode<JwtToken>(token)
      if (decoded.iss && decoded.iss.includes("hackpsu18")) {
        if (decoded.privilege && decoded.privilege >= privilege) {
          return true
        }
      }
    }
    return false
  }, [token])

  const resolveAuthState = useCallback(async (user?: User) => {
    if (user) {
      if (await validateToken(user)) {
        setUser(user)
        setAuthenticated(true)
      } else {
        setUser(undefined)
        setAuthenticated(false)
        setError(FirebaseError.NO_PERMISSION)
      }
    } else {
      setUser(undefined)
      setAuthenticated(false)
      setError(FirebaseError.NONE)
    }
  }, [])

  const resolveAuthError = useCallback( (error: string) => {
    switch (error) {
      case "auth/wrong-password":
        setError(FirebaseError.INVALID)
        break;
      case "auth/missing-email":
        setError(FirebaseError.MISSING_EMAIL)
        break;
    }
  }, [])

  const loginWithEmailAndPassword = useCallback(async (email: string, password: string) => {
    setError(FirebaseError.NONE)
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      if (userCredential.user) {
        await resolveAuthState(userCredential.user)
      }
    } catch (e) {
      resolveAuthError(e.code)
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      await signOut(auth)
      setToken("")
    } catch (e) {
      console.error(e)
    }
  }, [])

  useEffect(() => {
    return onAuthStateChanged(auth, async (user) => {
      await resolveAuthState(user ?? undefined)
    })
  }, [])

  const value = useMemo(() => ({
    user,
    loginWithEmailAndPassword,
    logout,
    authenticated,
    error,
    token,
    validatePermissions,
  }), [
    user,
    loginWithEmailAndPassword,
    logout,
    authenticated,
    error,
    token,
    validatePermissions,
  ])

  return (
    <FirebaseContext.Provider value={value}>
      { children }
    </FirebaseContext.Provider>
  )
}

export const useFirebase = () => useContext(FirebaseContext)
export default FirebaseProvider