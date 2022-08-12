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

  var valid = true;
valid = kiemTraRong(createStaff.tenNV,'#name','Tên Nhân Viên');

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
          // var chucVu = document.querySelector('#chucvu').value;
          if (arrStaff[i].chucVu == "Sếp") {
            return this.luongCB * 3;
          } else if (arrStaff[i].chucVu == "Trưởng phòng") {
            return this.luongCB * 2;
          } else {
            return this.luongCB;
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
      var tenNV = removeVietnameseTones(staffList[i].tenNV);
    if(tenNV.search(keyWord) != -1) {

      res.push(staffList[i]);
    }
  }
  renderStaffList(res);
}

document.querySelector('#searchName').onclick = find;
document.querySelector('#searchName').oninput = find;


//validation
var valid = true;
valid = kiemTraRong(Staff.tenNV,'#name','Tên Nhân Viên');









window.onload = function () {
  staffList = getLocalStorage('arrStaff');
  if(staffList == undefined){
    staffList = [];
  };
  renderStaffList(staffList);
}



function removeVietnameseTones(str) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  str = str.replace(/ + /g, " ");
  str = str.trim();
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  str = str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    " "
  );
  return str;
}