'use strict'
const checkAll = document.getElementById('checkAll');
const checkboxes = document.querySelectorAll('#check1, #check2, #check3');
const agreeBtn = document.querySelector('#agreeBtn');
const cancelBtn = document.querySelector('#cancelBtn');

document.addEventListener('DOMContentLoaded', function () {
  const savedEmail = sessionStorage.getItem('email');

  if (!savedEmail) {
    window.location.href = 'login.html';
  }
});

checkAll.addEventListener('change', function () {
  checkboxes.forEach((checkbox) => {
    checkbox.checked = checkAll.checked;
  });
  updateAgreeButtonState();
});

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', function () {
    checkAll.checked = Array.from(checkboxes).every((checkbox) => checkbox.checked)
    updateAgreeButtonState();
  });
});

function updateAgreeButtonState() {
  const allChecked = Array.from(checkboxes).every((checkbox) => checkbox.checked);
  const savedEmail = sessionStorage.getItem('email');
  agreeBtn.disabled = !(allChecked && savedEmail);
};

agreeBtn.addEventListener('click', function () {
  const savedEmail = sessionStorage.getItem('email');
  if (savedEmail) {
    window.location.href = 'signup.html';
  }
});

cancelBtn.addEventListener('click', function () {
  window.location.href = 'login.html'
  sessionStorage.removeItem('email');
});
