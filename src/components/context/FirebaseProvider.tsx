import {createContext, FC, useCallback, useContext, useEffect, useMemo, useRef, useState} from "react";
import { getAuth, signInWithEmailAndPassword, User, Auth } from 'firebase/auth'

const FirebaseContext = createContext({})

const FirebaseProvider: FC<{ auth: Auth }> = ({ auth, children }) => {
  const [user, setUser] = useState<User>()

  const loginWithEmailAndPassword = useCallback(async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)

      if (userCredential.user) {
        setUser(userCredential.user)
      }

    } catch (e) {
      console.error(e)
    }
  }, [])

  const value = useMemo(() => ({
    user,
    loginWithEmailAndPassword
  }), [
    user,
    loginWithEmailAndPassword
  ])

  return (
    <FirebaseContext.Provider value={value}>
      { children }
    </FirebaseContext.Provider>
  )
}

export const useFirebase = () => useContext(FirebaseContext)
export default FirebaseProvider