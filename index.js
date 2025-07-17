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

function customContextMenuCreate(e, item){
  e.preventDefault();
  let customContextMenu = document.createElement("div");
  customContextMenu.className = "custom-context-menu";
  customContextMenu.style.left = `${e.x}px`;
  customContextMenu.style.top = `${e.y}px`;

  let renameItem = document.createElement("div");
  renameItem.className = "context-menu-item";
  renameItem.textContent = "Rename";
  renameItem.addEventListener("click", function(e){
    popupRenameElement(e, item);
  });

  let deleteItem = document.createElement("div");
  deleteItem.className = "context-menu-item";
  deleteItem.textContent = "Delete";
  deleteItem.addEventListener("click", function(e){
    popupDeleteElement(e, item);
  });
  customContextMenu.appendChild(renameItem);
  customContextMenu.appendChild(deleteItem);

  document.body.appendChild(customContextMenu);
}

function render(){
  folderList.innerHTML = recution(0, tree);

  let publicList = $('.public-list')
  let distList = $('.dist-list')
  let srcList = $('.src-list')

  checkHasElement(distList, 0, tree[0].children, 0);
  checkHasElement(publicList, 0, tree[1].children, 1);
  checkHasElement(srcList, 0, tree[2].children, 2);

  let fileList = $$(".sidebar-child-item");
  fileList.forEach(item => {
    item.addEventListener("click", function(){
      fileList.forEach(i => {
        i.classList.remove("active");
      })
      item.classList.toggle("active");
      if(item.nextElementSibling && item.nextElementSibling.tagName === "UL"){
        item.nextElementSibling.classList.toggle("active");
      }
    })
    item.addEventListener("mousedown", function(event){
      
      if(event.button ===2){
        item.addEventListener("contextmenu", function(e){
          customContextMenuCreate(e, item)
        })
      } else {
        let customContextMenu = $$(".custom-context-menu");
        if(customContextMenu){
          customContextMenu.forEach(el => {
            el.removeEventListener("contextmenu", function(e){
              customContextMenuCreate(e, el)
            })
            document.body.removeChild(el);
          })
        }
      }
    })
  })
}

function checkHasElement(element, start, array, index){
  if(element)
    element.innerHTML = recution(start, array, index)
}