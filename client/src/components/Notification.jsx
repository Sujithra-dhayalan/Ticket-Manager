import { useState, useEffect } from 'react'
import './Notification.css'

export default function Notification({ message, type = 'error', onClose }) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(onClose, 4000)
      return () => clearTimeout(timer)
    }
  }, [message, onClose])

  if (!message) return null

  return (
    <div className={`notification notification-${type}`}>
      <div className="notification-content">
        <span className="notification-icon">
          {type === 'error' ? '✕' : '✓'}
        </span>
        <span className="notification-text">{message}</span>
        <button className="notification-close" onClick={onClose}>
          ×
        </button>
      </div>
    </div>
  )
}
