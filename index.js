// Import stylesheets
import './style.css';

// dialog polyfill
const dialog = document.getElementById('dialog');
dialogPolyfill.registerDialog(dialog);

// BodyScrollLock
const disableBodyScroll = bodyScrollLock.disableBodyScroll;
const enableBodyScroll = bodyScrollLock.enableBodyScroll;

const containerElement = document.getElementById('container');
// const dialogTitle = document.getElementById('dialogTitle');
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
  // 常時Titleが見えるように表示したい()
  // dialogTitle.scrollIntoView(true);
});

closeDialogButton.addEventListener('click', (event) => {
  // Dialog閉じたら、bodyLock
  enableBodyScroll(containerElement);
});

// 背景クリックした際、Dialog閉じる
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) {
    dialog.close('cancelled');
    enableBodyScroll(containerElement);
  }
});
