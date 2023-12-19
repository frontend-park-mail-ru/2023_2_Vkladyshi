import { router } from '@router/router';
import './index.css';
import { get } from '@utils/ajax';
import { urls } from '@utils/config';
// import { webSocket } from '@/webSocket';
// import { initializeApp } from 'firebase/app';
// import { getMessaging, onMessage, getToken } from 'firebase/messaging';
// import {get, post} from "@utils/ajax";
// import {urls} from "@utils/config";
//
// const firebaseConfig = {
//   apiKey: "AIzaSyBtARoxTN5NRwd6XLV3gOxkiO7IM1hAQBg",
//   authDomain: "vkladishi-1114b.firebaseapp.com",
//   projectId: "vkladishi-1114b",
//   storageBucket: "vkladishi-1114b.appspot.com",
//   messagingSenderId: "375356120690",
//   appId: "1:375356120690:web:a5fe1c85652081545c2ceb",
//   measurementId: "G-LZ2BJY0CLK"
// };
//
//
// const app = initializeApp(firebaseConfig);
// const messaging = getMessaging();

router.start();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch((err) => {
    console.error(err);
  });
}
if (!('PushManager' in window)) {
  console.error('Браузер не поддерживает push-уведомления.');
}

const registerSW = async () => {
  return navigator.serviceWorker.register('/notif-sw.js');
};

let lastText = '';

const reqiestNotif = async () => {
  const perm = await Notification.requestPermission();

  if (perm === 'granted') {
    setTimeout(sendNotify, 3000);
    setInterval(sendNotify, 60000);
  }
};

const sendNotify = async (data) => {
  const response = await get({
    url: urls.calendarSub,
  });
  if (response?.status === 200) {
    if (lastText !== response.body.title) {
      renderUI(response.body);
      lastText = response.body.title;
    }
  }
};

const renderUI = (data) => {
  const notif = {
    body: data.body,
    icon: 'https://movie-hub.ru/icons/brandTitle.svg',
    requireInteraction: true,
  };

  const notifUI = new Notification(data.title, notif);
};

registerSW();
reqiestNotif();
