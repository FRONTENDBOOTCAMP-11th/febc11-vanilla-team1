const checkAll = document.getElementById('checkAll');
const checkboxes = document.querySelectorAll('#check1, #check2, #check3');
const agreeBtn = document.querySelector('#agreeBtn');
const cancelBtn = document.querySelector('#cancelBtn');

checkAll.addEventListener('change', function () {
  checkboxes.forEach(checkbox => {
    checkbox.checked = checkAll.checked;
  });
  updateAgreeButtonState();
});

checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', function () {
    checkAll.checked = Array.from(checkboxes).every(
      checkbox => checkbox.checked,
    );
    updateAgreeButtonState();
  });
});

function updateAgreeButtonState() {
  const allChecked = Array.from(checkboxes).every(checkbox => checkbox.checked);
  agreeBtn.disabled = !(allChecked);
}

agreeBtn.addEventListener('click', function () {
  if (checkAll.checked === true) {
    window.location.href = 'signup.html';
  }
});

cancelBtn.addEventListener('click', function () {
  window.location.href = 'login.html';
  sessionStorage.clear();
});
