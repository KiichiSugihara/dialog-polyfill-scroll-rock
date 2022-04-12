// Import stylesheets
import './style.css';

// dialog polyfill
const dialog = document.querySelector('dialog');
dialogPolyfill.registerDialog(dialog);

// BodyScrollLock
const disableBodyScroll = bodyScrollLock.disableBodyScroll;
const enableBodyScroll = bodyScrollLock.enableBodyScroll;

const containerElement = document.getElementById('container');
const openDialogButton = document.getElementById('openDialogButton');
const closeDialogButton = document.getElementById('closeDialogButton');

openDialogButton.addEventListener('click', (event) => {
  // Dialog開く
  dialog.showModal();
  // Dialog開いたら、bodyLock
  disableBodyScroll(containerElement, {
    // iOS Safari15は、Dialogもlockされるので対処
    // 参考:　https://github.com/willmcpo/body-scroll-lock#allowtouchmove
    allowTouchMove: (el) => {
      while (el && el !== document.body) {
        if (el.getAttribute('body-scroll-lock-ignore') !== null) {
          return true;
        }

        el = el.parentElement;
      }
    },
  });
});

closeDialogButton.addEventListener('click', (event) => {
  // Dialog閉じたら、bodyLock
  enableBodyScroll(containerElement);
});
