//Định dạng ngày tháng

function formatDate(datetime) {
  try {
    if (datetime) {
      //chuyển thành dữ liệu ngày tháng
      datetime = new Date(datetime);
      let date = datetime.getDate();
      let month = datetime.getMonth() + 1;
      let year = datetime.getFullYear();
      date = date < 10 ? `0${date}` : date;
      month = month < 10 ? `0${month}` : month;

      return `${date}/${month}/${year}`;
    } else {
      return "";
    }
  } catch (error) {
    console.log(error);
    return "";
  }
}
//định dạng tiền tệ
function formatMoney(money) {
    try {
        return new Intl.NumberFormat('vi-VN', {style:'currency', currency:'VND'}).format(money)
    }
    catch(error){
        console.log(error)
        return ""
    }
}