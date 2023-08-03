var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCat = document.getElementById("productCat");
var productDesc = document.getElementById("productDesc");
var addProductBtn = document.getElementById("addProduct");
var updateProductBtn = document.getElementById("updateProduct");


var productList;
var productListName="productList";

if (localStorage.getItem("productListName") == null) {
  productList = [];
} else {
  productList = JSON.parse(localStorage.getItem("productListName"));
  displayProduct(productList);
}

function addProduct() {
 
 
 if(validateProductName()==true && validateProductPrice()==true){
  
  var product =
  {
    name: productName.value,
    price: productPrice.value,
    category: productCat.value,
    description: productDesc.value
  }

  productList.push(product);
  displayProduct(productList);
  local();
  updateForm();
}else{
  clearForm();

}
}


function displayProduct(list) {


  var cartona = "";
  for (var i = 0; i < list.length; i++) {
    cartona += ` <tr>
              <td>${i + 1}</td>
              <td>${list[i].newName ? list[i].newName : list[i].name}</td>
              <td>${list[i].price}</td>
              <td>${list[i].category}</td>
              <td>${list[i].description}</td>
              <td><button onclick="getUpdatedProduct(${i})" class="btn btn-success">Update</button></td>
              <td><button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button></td>
            </tr>`
  }
  document.getElementById("t-body").innerHTML = cartona;


}



function deleteProduct(index) {
  productList.splice(index, 1);
  local();
  displayProduct(productList);
}

function local() {
  var storage = productList;
  localStorage.setItem("productListName", JSON.stringify(storage));
}

function searchItem(term) {
  var foundItems = [];

  for (var i = 0; i < productList.length; i++) {
    if (productList[i].name.toLowerCase().includes(term.toLowerCase()) == true) {

      productList[i].newName = productList[i].name.toLowerCase().replace(term.toLowerCase(), `<span class="text-danger">${term}</span>`);
      foundItems.push(productList[i]);
    }
  }
  displayProduct(foundItems);
}

var index;
function getUpdatedProduct(getUpdate) {
index=getUpdate;
  addProductBtn.classList.add("d-none");
  updateProductBtn.classList.replace("d-none", "d-block");

  // productName.value = productList[index].name;
  // productPrice.value = productList[index].price;
  // productCat.value = productList[index].category;
  // productDesc.value = productList[index].description;

  updateForm(productList[getUpdate]);

}

function clearForm() {

  productName.value = "";
  productPrice.value = "";
  productCat.value = "";
  productDesc.value = "";

}

function updateForm(flag) {

  productName.value =flag?flag.name: "";
  productPrice.value = flag?flag.price: "";
  productCat.value = flag?flag.category: "";
  productDesc.value =flag?flag.description: "";

}



function updateProduct() {
  addProductBtn.classList.replace("d-none", "d-block");
  updateProductBtn.classList.replace("d-block", "d-none");
  productList[index].name=productName.value;
  productList[index].price= productPrice.value;
  productList[index].category=productCat.value;
  productList[index].description=productDesc.value;

  displayProduct(productList);
  clearForm();
  local();
}



function validateProductName(){
  var regexChar=/^[A-Z][a-z]{3,8}$/;
  if(regexChar.test(productName.value)==true){
    productName.style.border="none";
    document.getElementById("wrong").classList.add("d-none");

    return true
  }else{
    productName.style.border="5px solid red";
    document.getElementById("wrong").classList.remove("d-none");
    return false
  }

}




function validateProductPrice(){
  var regex=/^[1-9]([0-9]{3,4})|10000$/;
  if(regex.test(productPrice.value)==true){
    productPrice.style.border="none";
    document.getElementById("wrongNumber").classList.add("d-none");

    return true
  }else{
    productPrice.style.border="5px solid red";
    document.getElementById("wrongNumber").classList.remove("d-none");
    return false
  }

}