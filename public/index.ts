import { router } from '@router/router';
import './index.css';
import { webSocket } from '@/webSocket';

router.start();
webSocket.initialize();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch((err) => {
    console.error(err);
  });
}
