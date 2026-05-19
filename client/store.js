import {
  initialize,
  showPage,
  closeCart,
  addToCartFromDetail,
  changeQty,
  updatePrice
} from './store/ui.js';

window.showPage = showPage;
window.closeCart = closeCart;
window.addToCartFromDetail = addToCartFromDetail;
window.changeQty = changeQty;
window.updatePrice = updatePrice;

initialize();
