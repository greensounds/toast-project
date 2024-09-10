import React from 'react';
import useEscapeKey from '../hooks/use-keydown';

export const ToastContext = React.createContext()

function ToastProvider({children}) {
  const [toasts, setToasts] = React.useState([
    {
      id: crypto.randomUUID(),
      message: 'Oh nooo',
      variant: 'error'
    },
    {
      id: crypto.randomUUID(),
      message: 'Oh yes',
      variant: 'success'
    }
  ])

  const handleEscape = React.useCallback(() => {
    setToasts([])
  }, [])

  useEscapeKey('Escape', handleEscape)

  function createToast(message, variant) {
    const nextToasts = [
      ...toasts,
      {
        id: crypto.randomUUID(),
        message,
        variant
      }
    ]

    setToasts(nextToasts)
  }

  function dismissToast(id) {
    const nextToasts = toasts.filter(toast => {
      return toast.id !== id
    })

    setToasts(nextToasts)
  }


  return <ToastContext.Provider value={{ toasts, createToast, dismissToast }}>
    {children}
  </ToastContext.Provider>;
}

export default ToastProvider;
