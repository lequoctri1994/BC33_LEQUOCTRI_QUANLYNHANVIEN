function kiemTraRong(value, selectorError, name) {
  if (value === "") {
    document.querySelector(selectorError).innerHTML =
      name + " không được bỏ trống";
    return false;
  }
  document.querySelector(selectorError).innerHTML = "";
  return true;
}
