let resize_el = document.getElementById("resize");
resize_el.addEventListener("mousedown", function(){
    document.addEventListener("mousemove", resize, false);
}, false);
document.addEventListener("mouseup", function(){
    document.removeEventListener("mousemove", resize, false);
}, false);

let sidebarHeaderTitle = document.querySelectorAll(".header-title");
sidebarHeaderTitle.forEach(title => {
  title.addEventListener("click", function(){
    title.classList.toggle("active");
    title.nextElementSibling.classList.toggle('active');
  })
})

render();