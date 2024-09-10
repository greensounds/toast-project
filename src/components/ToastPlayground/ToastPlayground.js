import React from 'react';

import Button from '../Button';

import styles from './ToastPlayground.module.css';
import { ToastContext  } from '../ToastProvider';

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

import ToastShelf from '../ToastShelf'

function ToastPlayground() {
  const { createToast } = React.useContext(ToastContext) 
  const [message, setMessage] = React.useState('')
  const [variant, setVariant] = React.useState(
    VARIANT_OPTIONS[0]
  );
  
  function handleCreateToast(e) {
    e.preventDefault();

    createToast(message, variant)
    
    setMessage('')
    setVariant(VARIANT_OPTIONS[0])
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <form onSubmit={handleCreateToast} className={styles.controlsWrapper}>
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: 'baseline' }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea onChange={(e) => setMessage(e.target.value)} id="message" className={styles.messageInput} />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
            {VARIANT_OPTIONS.map((item) => {
              const id = `variant-${item}`;

              return (
                <label key={item} htmlFor="variant-notice">
                <input
                  id={id}
                  type="radio"
                  name="variant"
                  value={item}
                  checked={variant === item}
                  onChange={event => {
                    setVariant(event.target.value)
                  }}
                />
                {item}
              </label>
            )})}
          
            {/* TODO Other Variant radio buttons here */}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
            <Button>Pop Toast!</Button>
          </div>
        </div>

        <ToastShelf />

      </form>
    </div>
  );
}

export default ToastPlayground;
