import { useEffect, useRef, useState } from 'react';
import createUseContext from 'constate';

import useNotificationContext from './Notifications';
import usePoolContext from './Pool';

function useTrain() {
  const [notifications] = useNotificationContext();
  const [, dispatchToPool] = usePoolContext();
  const lastSeenNotification = useRef();
  const [isActive, setIsActive] = useState(false);
  const [count, setCount] = useState(0);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    console.log('Notification Queue:', notifications);
  }, [notifications]);

  useEffect(() => {
    const last = notifications[notifications.length - 1];
    if (
      last &&
      (last.bucket === 'subscription' || last.event === 'mysterygift') &&
      (!lastSeenNotification.current ||
        last.id !== lastSeenNotification.current)
    ) {
      const amount = parseInt(last.count, 10) || 1;
      lastSeenNotification.current = last.id;
      setTimer(300);
      setCount(c => c + amount);
    }
  }, [notifications]);

  useEffect(() => {
    const id = setInterval(() => {
      if (timer > 0) {
        setTimer(t => t - 1);
      }
    }, 1000);
    return () => clearInterval(id);
  }, [timer]);

  useEffect(() => {
    if (timer <= 0) {
      setCount(0);
      setIsActive(false);
      dispatchToPool({ type: 'empty' });
    } else if (timer > 0) {
      setIsActive(true);
    }
  }, [dispatchToPool, timer]);

  return { isTrainActive: isActive, count, timer };
}

const useTrainContext = createUseContext(useTrain);

export default useTrainContext;
