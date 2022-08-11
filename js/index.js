var staffList = [];
function saveLocalStorage(ob,key) {
  var str = JSON.stringify(ob);
  localStorage.setItem(key,str);
}

function getLocalStorage(key){
  if(localStorage.getItem(key)){
  var str = localStorage.getItem(key);
  var ob = JSON.parse(str);
  return ob;
  }
  return undefined;
}

function createStaff() {
  var taiKhoanNV = document.querySelector("#tknv").value;
  var tenNV = document.querySelector("#name").value;
  var email = document.querySelector("#email").value;
  var matKhau = document.querySelector("#password").value;
  var ngayLam = document.querySelector("#datepicker").value;
  var luongCB = +document.querySelector("#luongCB").value;
  var chucVu = document.querySelector("#chucvu").value;
  var gioLam = +document.querySelector("#gioLam").value;

  var staff = new Staff(
    taiKhoanNV,
    tenNV,
    email,
    matKhau,
    ngayLam,
    luongCB,
    chucVu,
    gioLam,
  );

  staffList.push(staff);
  renderStaffList(staffList);

  saveLocalStorage(staffList,'arrStaff');
}

function renderStaffList (arrStaff) {
    var output = '';
    for (var i = 0; i < arrStaff.length; i++){
        var obStaff = arrStaff[i];
        obStaff.tongLuong = function () {
          var chucVu = document.querySelector('#chucvu').value;
          var luong = this.luongCB * this.gioLam;
          if (chucVu == "Sếp") {
            return luong * 3;
          } else if (chucVu == "Trưởng phòng") {
            return luong * 2;
          } else {
            return luong;
          }
        };

        obStaff.xepLoaiNV = function () {
          // var gioLam = +document.querySelector("#gioLam").value;
          var xepLoai = "";
          if (arrStaff[i].gioLam >= 192) {
            xepLoai += "Xuất Sắc";
          } else if (arrStaff[i].gioLam >= 176) {
            xepLoai += "Giỏi";
          } else if (arrStaff[i].gioLam >= 160) {
            xepLoai += "Khá";
          } else {
            xepLoai += "Trung Bình";
          }
          return xepLoai;
        };
        var trStaff = `
        <tr>
            <td>${obStaff.taiKhoanNV}</td>
            <td>${obStaff.tenNV}</td>
            <td>${obStaff.email}</td>
            <td>${obStaff.ngayLam}</td>
            <td>${obStaff.chucVu}</td>
            <td>${obStaff.tongLuong()}</td>
            <td>${obStaff.xepLoaiNV()}</td>
            <td>
              <button class="btn btn-danger" onclick="delStaff('${obStaff.taiKhoanNV}')">Delete</button>
              <button class="btn btn-primary" data-target="#myModal" data-toggle="modal" onclick="EditStaff('${obStaff.taiKhoanNV}')">Update</button>
            </td>
        </tr>
        `;

        output += trStaff;
    }
    document.querySelector('#tableDanhSach').innerHTML = output;
}

function delStaff (tkClick) {
  var iDel = -1;
  for (var i = 0; i < staffList.length; i++){
    if(staffList[i].taiKhoanNV == tkClick){
      iDel = i;
      break;
    }
  }
  if (iDel !== -1) {
    staffList.splice(iDel,1);
    renderStaffList(staffList);
  };
};

function EditStaff (tkClick) {

  var editStaff = null;
  for (var i = 0; i < staffList.length; i++){
    if(staffList[i].taiKhoanNV == tkClick){
    editStaff = staffList[i];
    break;
    }
  }
  
  if(editStaff !== null) {
    document.querySelector('#tknv').value = editStaff.taiKhoanNV;
    document.querySelector('#name').value = editStaff.tenNV;
    document.querySelector('#email').value = editStaff.email;
    document.querySelector('#password').value = editStaff.password;
    document.querySelector('#luongCB').value = editStaff.luongCB;
    document.querySelector('#chucvu').value = editStaff.chucvu;
    document.querySelector('#gioLam').value = editStaff.gioLam;
  }
}

function UpdateStaff () {
  var staffUpdate = new Staff();
  staffUpdate.taiKhoanNV = document.querySelector('#tknv').value;
  staffUpdate.tenNV = document.querySelector('#name').value;
  staffUpdate.email = document.querySelector('#email').value;
  staffUpdate.matKhau = document.querySelector('#password').value;
  staffUpdate.luongCB = document.querySelector('#luongCB').value;
  staffUpdate.chucVu = document.querySelector('#chucvu').value;
  staffUpdate.gioLam = document.querySelector('#gioLam').value;

  console.log(staffUpdate)

  var iUpdate = -1;
  for (var i = 0; i < staffList.length; i++ ){
    if(staffList[i].taiKhoanNV == staffUpdate.taiKhoanNV) {
      iUpdate = i;
      break;
    }
  }
  if(iUpdate !== -1) {
    staffList[iUpdate].tenNV = staffUpdate.tenNV;
    staffList[iUpdate].email = staffUpdate.email;
    staffList[iUpdate].matKhau = staffUpdate.matKhau;
    staffList[iUpdate].luongCB = staffUpdate.luongCB;
    staffList[iUpdate].chucVu = staffUpdate.chucVu;
    staffList[iUpdate].gioLam = staffUpdate.gioLam;
    renderStaffList(staffList);
  }
}

function searchStaff() {
  var keyWord = document.querySelector('#searchName').value;
  
  var res = [];

  for (i = 0; i < staffList.length; i++) {
    if(staffList[i].tenNV.search(keyWord) != -1) {
      res.push(staffList[i]);
    }
  }
  renderStaffList(res);
}

document.querySelector('#searchName').onclick = searchStaff;
document.querySelector('#searchName').oninput = searchStaff;


//validation

valid = kiemTraRong(createStaff.taiKhoanNV,'#tknv','Tài Khoản Nhân Viên');









window.onload = function () {
  staffList = getLocalStorage('arrStaff');
  if(staffList == undefined){
    staffList = [];
  };
  renderStaffList(staffList);
}