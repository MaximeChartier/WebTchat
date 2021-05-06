import React from 'react'
import ReactDOM from 'react-dom'
import { classNames } from '../functions/dom.js'

export function Modal ({ children, onClose, padding, style, className }) {
  const bodyClassName = classNames('modal-box', padding && `p${padding}`, className)
  return ReactDOM.createPortal(
    <modal-dialog overlay-close onClose={onClose}>
      <section className={bodyClassName} style={style}>
        {children}
      </section>
    </modal-dialog>,
    document.body
  )
}
