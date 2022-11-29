import create from 'zustand';
import { generateId } from 'lib/utils/shared_functions';
import { Notification, NOTIFICATION_TYPE } from 'types/shared/notification';

interface NotificationState {
  notifications: Notification[];
  send: (notification: Omit<Notification, 'id'>) => void;
}

const useNotification = create<NotificationState>((set) => ({
  notifications: [],
  send: ({ type = NOTIFICATION_TYPE.INFO, message, timeout = 5000 }) =>
    set((state) => {
      const notifications = [...state.notifications];
      const generatedId = generateId();
      notifications.push({ id: generatedId, type, message, timeout });
      return { notifications };
    }),
}));

export default useNotification;
