function Staff(
  taiKhoanNV,
  tenNV,
  email,
  matKhau,
  ngayLam,
  luongCB,
  chucVu,
  gioLam
) {
  this.taiKhoanNV = taiKhoanNV;
  this.tenNV = tenNV;
  this.email = email;
  this.matKhau = matKhau;
  this.ngayLam = ngayLam;
  this.luongCB = luongCB;
  this.chucVu = chucVu;
  this.gioLam = gioLam;
  this.tongLuong = function () {
    var luong = this.luongCB * this.gioLam;
    if (chucVu == "Sếp") {
      return luong * 3;
    } else if (chucVu == "Trưởng phòng") {
      return luong * 2;
    } else {
      return luong;
    }
  };
  this.xepLoaiNV = function () {
    var xepLoai = "";
    if (gioLam >= 192) {
      xepLoai += "Xuất Sắc";
    } else if (gioLam >= 176) {
      xepLoai += "Giỏi";
    } else if (gioLam >= 160) {
      xepLoai += "Khá";
    } else {
      xepLoai += "Trung Bình";
    }
    return xepLoai;
  };
}
