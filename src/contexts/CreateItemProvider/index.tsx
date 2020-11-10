import React, { createContext, useState } from 'react'

interface CreateItemContext {
  visible: boolean,
  setVisible: Function
}

export const Context = createContext<CreateItemContext>({
  visible: false,
  setVisible: () => {}
})

const CreateItemProvider: React.FC = ({ children }) => {
  const [visible, setVisible] = useState<any>(false)

  return <Context.Provider value={{ visible: visible, setVisible: setVisible }}>{children}</Context.Provider>
}

export default CreateItemProvider
