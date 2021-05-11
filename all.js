// 第一步：先定義資料（關注點分離）
// 第二步：定義渲染的函式
// 第三步：專注在資料的處理，確保每個資料結果是正確的
// 第四步：資料處理完成後執行渲染的方法

// 關注點分離的概念：
// 畫面 - HTML
// 資料 - JS-DATA
// 方法：畫面與資料的溝通 - JS-function



// 定義DOM
  // 表單內容
const productTitle = document.getElementById('title');
const originPrice = document.getElementById('originPrice');
const sellPrice = document.getElementById('sellPrice');
  // 按鈕
const addProductBtn = document.getElementById('addProduct');
const delAllBtn = document.getElementById('delAll');
  // 產品清單內容
const productList = document.getElementById('productList');
const productCount = document.getElementById('productCount');

// 初始化資料
let productData = [];

// init 生命週期
renderPage(productData);

// 建立產品
function addProduct(){
  // Math.floor() 函式會回傳小於等於所給數字的最大整數
  // Date.now 會回傳經過的毫秒數

  // 不是非常清楚 id 的應用為何，依照時間來給予他的 id？
  
  let id = Math.floor(Date.now());
  // trim() 會刪除兩邊的空白字符
  let productName = productTitle.value.trim();
  // 物件 Number 會將欲處理的變數轉換成數字
  let oriPrice = Number(originPrice.value) || 0;
  let price = Number(sellPrice.value) || 0;
  let state = false;
  if(productName){
    let newProduct = {
      id,
      productName,
      oriPrice,
      price,
      state,
    };
    productData.push(newProduct);
    // 執行畫面渲染
    renderPage(productData);
    // 表單清除
    formClear();
  } 
}

// 刪除單一產品
function delProduct(id){
  // 定義到的 id 若配對到則從該 id 開始刪除？？
  let newIndex = 0;
  productData.forEach((item,key) =>{
    if(id == item.id){
      newIndex = key;
    }
  })
  productData.splice(newIndex,1);
  renderPage(productData);
}

// 產品啟用狀態
function statusProduct(id){
  productData.forEach((item)=>{
    if(id == item.id){
      // 這一段不太清楚， item.state = !item.state是什麼意思?
      item.state = !item.state;
    }
  })
  renderPage(productData);
}

// 清除全部
function delAllProduct(event){
  // 取消a連結預設效果       按鈕也需要嗎？
  event.preventDefault();
  productData = [];
  renderPage(productData);
}

// 表單input輸入欄清除
function formClear(){
  productTitle.value = '';
  originPrice.value = '';
  sellPrice.value = '';
}

// 對表單內容進行 刪除單一 或是 更改啟用狀態
function doSomething(e) {
  const action = e.target.dataset.action;
  const id = e.target.dataset.id;
  if (action === 'remove') {
    delProduct(id)
  } else if (action === 'status') {
    statusProduct(id)
  }
}


// 渲染畫面
function renderPage(data){
  let str = '';
  data.forEach((item) => {
    str += `
    <tr>
      <td>${item.productName}</td>
      <td width="120">
        ${item.oriPrice}
      </td>
      <td width="120">
        ${item.price}
      </td>
      <td width="100">
        <div class="form-check form-switch">
          <input class="form-check-input" type="checkbox" id="${item.id}" ${item.state? 'checked': ''} data-action="status" data-id="${item.id}">
          <label class="form-check-label" for="${item.id}">${item.state? '啟用' : '未啟用'}
          </label>
        </div>
      </td>
      <td width="120>
        <button type="button" class="btn btn-sm btn-danger move" data-action="remove" data-id="${item.id}"> 刪除 </button>
      </td>
    </tr>`
  })
  productList.innerHTML = str;
  productCount.textContent = data.length;
}

// 監聽事件
addProductBtn.addEventListener('click',addProduct);
delAllBtn.addEventListener('click',delAllProduct);
productList.addEventListener('click', doSomething);