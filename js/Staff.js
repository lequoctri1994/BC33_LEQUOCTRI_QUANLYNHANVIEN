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
    if (chucVu == "Sếp") {
      return (this.luong * 3);
    } else if (chucVu == "Trưởng phòng") {
      return (this.luong * 2);
    } else {
      return this.luong;
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
