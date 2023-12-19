// import {get} from '@utils/ajax';
// import {urls} from '@utils/config';
//
// console.log('notif-sw.js');
//
// let lastText = '';
//
// const reqiestNotif = async () => {
//     const perm = await Notification.requestPermission();
//
//     if (perm === 'granted') {
//         setTimeout(sendNotify, 3000);
//         // setInterval(sendNotify, 60000);
//     }
// };
//
// const sendNotify = async (data) => {
//     const response = await get({
//         url: urls.calendarSub,
//     });
//     if (response?.status === 200) {
//         if (lastText !== response.body.title) {
//             renderUI(response.body);
//             lastText = response.body.title;
//         }
//     }
// };
//
// const renderUI = (data) => {
//     const notif = {
//         body: data.body,
//         icon: 'https://movie-hub.ru/icons/brandTitle.svg',
//         requireInteraction: true,
//     };
//
//     const notifUI = new Notification(data.title, notif);
// };
//
// registerSW();
// reqiestNotif();
