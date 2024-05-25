export function formatMoneyVND(amount, suffix = '', toFixed = 0) {
  // Định dạng số thành chuỗi có dấu phẩy ngăn cách hàng nghìn
  const formattedAmount = parseFloat(amount).toFixed(toFixed).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // Thêm đơn vị tiền tệ VND
  return `${formattedAmount}${suffix}`;
}

// Sử dụng hàm và in kết quả
// const money = 1234567;
// const formattedMoney = formatMoneyVND(money);
// console.log(formattedMoney); // Kết quả: "1,234,567 VND"
