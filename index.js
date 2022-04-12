// Import stylesheets
import './style.css';

// dialog polyfill
const dialog = document.querySelector('dialog');
dialogPolyfill.registerDialog(dialog);

// BodyScrollLock
const disableBodyScroll = bodyScrollLock.disableBodyScroll;
const enableBodyScroll = bodyScrollLock.enableBodyScroll;

const bodyElement = document.getElementById('body');
const openDialogButton = document.getElementById('openDialogButton');
const closeDialogButton = document.getElementById('closeDialogButton');

openDialogButton.addEventListener('click', (event) => {
  // Dialog開く
  dialog.showModal();
  // Dialog開いたら、bodyLock
  disableBodyScroll(bodyElement);
});

closeDialogButton.addEventListener('click', (event) => {
  // Dialog閉じたら、bodyLock
  enableBodyScroll(bodyElement);
});
