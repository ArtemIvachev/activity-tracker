import React, { createContext, useState } from 'react'

const UserContext = createContext({
  userIdToUpdate: undefined,
  setUserIdToUpdate: (_typeId) => null,
})

export const useUsers = () => React.useContext(UserContext)

export function UserProvider({ children }) {
  const [userIdToUpdate, setUserIdToUpdate] = useState(undefined)

  return (
    <UserContext.Provider
      value={{
        userIdToUpdate,
        setUserIdToUpdate,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
