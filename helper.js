const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

let openList = $(".open-list");
let folderList = $(".folder-list");
let outlineList = $(".outline-list");
let timelineList = $(".timeline-list");

let deleteModal = $("#deleteModal");
let deleteBtn = $(".delete-btn");

let renameModal = $("#renameModal");
let inputRename = $(".input-rename");
let renameBtn = $(".rename-btn");

let closeButton = $$(".close-button");

let tree = [
  {
    type: 'folder',
    name: 'dist',
    children: [
      {
        type: 'folder',
        name: 'assets',
        children: [
          {
            type: "folder",
            name: "img",
            children: []
          },
          { type: 'file', name: 'main-D5hb676N.css' },
          { type: 'file', name: 'main-DoMvZR6W.js' }
        ]
      },
      { type: 'file', name: 'account.html' },
      { type: 'file', name: 'collection.html' },
      { type: 'file', name: 'index.html' },
      { type: 'file', name: 'myaccount.html' },
      { type: 'file', name: 'payment.html' },
      { type: 'file', name: 'sign-in.html' },
      { type: 'file', name: 'sign-up.html' },
      { type: 'file', name: 'transaction-history.html' },
    ]
  },
  {
    type: 'folder',
    name: 'public',
    children: [
      {
        type: 'folder',
        name: 'about',
        children: [
          { type: 'file', name: 'fqas.png' }
        ]
      },
      {
        type: 'folder',
        name: 'account',
        children: [
          { type: 'file', name: 'avatar.png' },
          { type: 'file', name: 'background.jpg' },
          { type: 'file', name: 'favorite.svg' },
          { type: 'file', name: 'history.svg' },
          { type: 'file', name: 'coin.png' },
          { type: 'file', name: 'user.svg' },
        ]
      },
      {
        type: 'folder',
        name: 'transaction',
        children: [
          { type: 'file', name: 'product.png' },
        ]
      },
      {
        type: 'folder',
        name: 'sign-in',
        children: [
          { type: 'file', name: 'background.png' },
        ]
      },
      {
        type: 'folder',
        name: 'sign-up',
        children: [
          { type: 'file', name: 'background.png' },
        ]
      },
      { type: 'file', name: 'index.js' }
    ]
  },
  {
    type: 'folder',
    name: 'src',
    children: [
      {
        type: 'folder',
        name: 'partials',
        children: [
          { type: 'file', name: 'button.ejs' },
          { type: 'file', name: 'footer.ejs' },
          { type: 'file', name: 'form.ejs' },
          { type: 'file', name: 'grouplist-products.ejs' },
          { type: 'file', name: 'head.ejs' },
          { type: 'file', name: 'header.ejs' },
          { type: 'file', name: 'list-cards.ejs' },
          { type: 'file', name: 'news-list.ejs' },
          { type: 'file', name: 'section-header.ejs' },
          { type: 'file', name: 'split-banner.ejs' },
        ]
      },
      {
        type: 'folder',
        name: 'scss',
        children: [
          {
            type: "folder",
            name: "components",
            children: []
          },
          {
            type: "folder",
            name: "layout",
            children: []
          },
          {
            type: "folder",
            name: "pages",
            children: []
          },
          { type: 'file', name: '_reset.scss' },
          { type: 'file', name: '_variables.scss' },
          { type: 'file', name: 'main.scss' }
        ]
      },
      { type: 'file', name: 'account.html' },
      { type: 'file', name: 'collection.html' },
      { type: 'file', name: 'index.html' },
      { type: 'file', name: 'myaccount.html' },
      { type: 'file', name: 'payment.html' },
      { type: 'file', name: 'sign-in.html' },
      { type: 'file', name: 'sign-up.html' },
      { type: 'file', name: 'transaction-history.html' },
      { type: 'file', name: 'main.js' },
    ]
  },
  { type: 'file', name: '.gitignore' },
  { type: 'file', name: 'package.json' },
  { type: 'file', name: 'package-lock.json' },
  { type: 'file', name: 'README.md' },
  { type: 'file', name: 'vite.config.js' }
];

function resize(e){
    let parent = resize_el.parentNode;
    if(e.x > 140){
        parent.style.width = `${e.x - 40}px`;
    } else{
        parent.style.width = "140px";
    }
}

function recution(start, array, index) {
    let end = array ? array.length : 0;
    if (start >= end) return "";
    let splitName = array[start].name.split(".");
    let extension = getIcons(splitName[splitName.length - 1]);
    let html = `
      <li class="sidebar-child-item" data-source='${start}' data-index='${index}'>
        ${extension} ${array[start].name}
      </li>
      ${ array[start].children 
        ?`<ul class="sidebar-child ${array[start].name}-list"></ul>`
        : ""
      }
    `;
    return html + recution(start + 1, array, index);
}

function getIcons(extension) {
  switch (extension) {
    case "html":
      return '<i class="fa-brands fa-html5"></i>';
    case "js":
      return '<i class="fa-brands fa-js"></i>';
    case "react":
      return '<i class="fa-brands fa-react"></i>';
    case "angular":
      return '<i class="fa-brands fa-angular"></i>';
    case "node":
      return '<i class="fa-brands fa-node-js"></i>';
    case "css":
      return '<i class="fa-brands fa-css3-alt"></i>';
    case "png":
    case "jpg":
    case "jpeg":
    case "webp":
    case "svg":
      return '<i class="fa-regular fa-file-image"></i>';
    case "json":
      return '<i class="fa-brands fa-js"></i>';
    case "md":
      return '<i class="fa-regular fa-file-lines"></i>';
    case "gitignore":
      return '<i class="fa-brands fa-git"></i>';
    default:
      return '<i class="fa-solid fa-folder"></i>';
  }
}

function popupRenameElement(e, item){
  document.body.removeChild(e.target.closest(".custom-context-menu"));
  renameModal.classList.toggle("active");
  inputRename.value = item.textContent.trim();
  let renameText = inputRename.value;
  inputRename.addEventListener("input", function(e){
    renameText = e.target.value;
  })
  renameBtn.addEventListener("click", function(){
    renameElement(item, renameText);
  })  
  closeButton[0].addEventListener("click", function(){
    renameModal.classList.remove("active");    
  })
}
function popupDeleteElement(e, item){
  document.body.removeChild(e.target.closest(".custom-context-menu"));
  deleteModal.classList.toggle("active");
  deleteBtn.addEventListener("click", function(){
    deleteElement(item);
  })
  closeButton[1].addEventListener("click", function(){
    deleteModal.classList.remove("active");    
  })
}

function renameElement(item, text){
  let index = item.dataset.index;
  let source = item.dataset.source;
  console.log(item)
  if(index === "undefined"){
    tree[source].name= text;
  } else {
    tree[parseInt(index)].children[source].name = text;
    // console.log(tree[parseInt(index)].children[source].name)
  }
  renameModal.classList.remove("active");
  inputRename.value = "";
  render()
}
function deleteElement(item){
  let index = item.dataset.index;
  let source = item.dataset.source;
  if(index === "undefined"){
    if(tree[source])
      tree = tree.filter(e => e.name !== tree[source].name);
  }else{
    if(tree[parseInt(index)].children[source])
      tree[parseInt(index)].children = tree[parseInt(index)].children.filter(e => e.name !== tree[parseInt(index)].children[source].name);
  }
  deleteModal.classList.remove("active");
  render();
}