import { router } from '@router/router';
import './index.css';

router.start();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch((err) => {
    console.error(err);
  });
}
