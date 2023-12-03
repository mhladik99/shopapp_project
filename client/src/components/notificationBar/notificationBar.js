import React, { useState, useEffect } from 'react';
import { useNotification } from '../../NotificationContext.js';
import './notificationBar.css';

const NotificationBar = () => {
  const { notification, hideNotification } = useNotification();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (notification) {
      setIsVisible(true);

      const timeoutId = setTimeout(() => {
        setIsVisible(false);
        hideNotification();
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [notification, hideNotification]);

  const handleAnimationEnd = () => {
    setIsVisible(false);
  };

  // Render the NotificationBar only when there is a notification
  if (!notification) {
    return null;
  }

  return (
    <div
      className={`notification-bar ${isVisible ? 'visible' : ''}`}
      onAnimationEnd={handleAnimationEnd}
    >
      <p>{notification}</p>
    </div>
  );
};

export default NotificationBar;