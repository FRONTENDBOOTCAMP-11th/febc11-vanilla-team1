var act = document.getElementsByClassName("active_button"); 
var val; //변수 val

for (val = 0; val < act.length; val++) { 
  act[val].addEventListener("click", function() { 
    this.classList.toggle("on");     //화살표 on off

    var shoes_panel = this.nextElementSibling; 
    
    // 높이 속성값
    if (shoes_panel.style.maxHeight) { 
      shoes_panel.style.maxHeight = null;
    } else {
      shoes_panel.style.maxHeight = shoes_panel.scrollHeight + "px"; 
    } 
  });
}