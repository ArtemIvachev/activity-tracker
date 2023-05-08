import React, { createContext, useState } from 'react'

const TypeContext = createContext({
  typeIdToUpdate: undefined,
  setTypeIdToUpdate: (_typeId) => null,
})

export const useTypes = () => React.useContext(TypeContext)

export function TypeProvider({ children }) {
  const [typeIdToUpdate, setTypeIdToUpdate] = useState(undefined)

  return (
    <TypeContext.Provider
      value={{
        typeIdToUpdate,
        setTypeIdToUpdate,
      }}
    >
      {children}
    </TypeContext.Provider>
  )
}
