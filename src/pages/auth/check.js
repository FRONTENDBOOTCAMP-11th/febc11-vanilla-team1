'use strict'
const checkAll = document.getElementById('checkAll');
const checkboxes = document.querySelectorAll('#check1, #check2, #check3');

checkAll.addEventListener('change', function () {
  checkboxes.forEach((checkbox) => {
    checkbox.checked = checkAll.checked;
  });
});

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', function () {
    checkAll.checked = Array.from(checkboxes).every((checkbox) => checkbox.checked)
  });
});
