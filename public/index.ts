import { router } from '@router/router';
import './index.css';
import { notification } from '@/notification';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch((err) => {
    console.error(err);
  });
}
if (!('PushManager' in window)) {
  console.error('Браузер не поддерживает push-уведомления.');
}

router.start();

notification.reqiestNotif().then(() => {
  notification.startSending();
});
