var siteName = document.querySelector("#siteName");

var siteURL = document.querySelector("#siteURL");
var closeBtn = document.querySelector("#closeBtn");
var exists = document.querySelector("#exists");
var inputElement = document.querySelectorAll("input");

var bookmarkList;
var listName = bookmarkList;




if (localStorage.getItem("listName") == null) {
  bookmarkList = [];
} else {
  bookmarkList = JSON.parse(localStorage.getItem("listName"));
  displayData(bookmarkList)
}





function addBookmark() {

  if ( validateInput(siteName,regexName)
  &&   validateInput(siteURL,regexURL)
  ) {
    var bookmark = {
      name: siteName.value,
      url: siteURL.value
    }

    for (var i = 0; i < bookmarkList.length; i++) {
      if (bookmarkList[i].name === bookmark.name) {
        exists.classList.replace("d-none","d-flex");
        return;
      } 
      exists.classList.replace("d-flex","d-none");
    }

    bookmarkList.push(bookmark);
    displayData(bookmarkList);
    storage();
    clearForm();

  } else {
    lightBoxContainer.classList.replace("d-none","d-flex");

 }

}



//Local storage
function storage() {
  localStorage.setItem("listName", JSON.stringify(bookmarkList));
}
//Display list
function displayData(list) {
  var cartona = "";
  for (var i = 0; i < list.length; i++) {
    cartona += `  <tr>
                <td>${i + 1}</td>
                <td>${list[i].name}</td>
                <td><button class=" btn btn-visit">
                <i class="fa-solid fa-eye pe-2 btn-iconz"></i>
                <a href="${list[i].url}"  target="_blank" >Visit URL</a>
                </button></td>
                <td><button onclick="deleteData(${i})" class=" btn btn-delete">
                <i class="fa-solid fa-trash-can btn-icons"></i>
                Delete</button></td>
                </tr>`
  }
  document.getElementById("t-body").innerHTML = cartona;

}
//Delete from list
function deleteData(index) {
  bookmarkList.splice(index, 1);
  storage();
  displayData(bookmarkList);

}



//clear form
function clearForm() {
  siteURL.value = "";
  siteURL.style.boxShadow = "none";
  siteURL.style.border = "1px solid #ced4da";    
  siteURL.addEventListener("focus", function () {
    siteURL.style.borderColor = " #d99c39";
    siteURL.style.boxShadow = " 0 0 0 0.25rem #fec26055";
  });
  siteURL.addEventListener("focusout", function () {
    siteURL.style.border = "1px solid #ced4da";    

  });
  
  siteName.value = "";
  siteName.style.boxShadow = "none";
  siteName.style.border = "1px solid #ced4da";    
  siteName.addEventListener("focus", function () {
    siteName.style.borderColor = " #d99c39";
    siteName.style.boxShadow = " 0 0 0 0.25rem #fec26055";
  });
  siteName.addEventListener("focusout", function () {
    siteName.style.border = "1px solid #ced4da";    

  });

}
//Validation 
function validateInput(inputElement, regex) {
  if (regex.test(inputElement.value)) {
    inputElement.style.border = "2px solid #198754";
    inputElement.style.boxShadow = "0 0 0 0.25rem #1987544E";
    inputElement.addEventListener("focusout", function () {
    inputElement.style.boxShadow = "none";
    });
    return true;
  } else {
    inputElement.style.border = "2px solid red";
    inputElement.style.boxShadow = "0 0 0 0.25rem #FF000060";
    inputElement.addEventListener("focusout", function () {
    inputElement.style.boxShadow = "none";
    });
    return false;
  }
}
var regexName= /^[A-Z][a-z0-9]{3,}$/;
var regexURL=  /^(http(s)?:\/\/)([a-zA-Z0-9@:%._\+~#=]{2,})\.[a-z]{2,6}([a-zA-Z0-9@:%._\/+=~#=?\-&",']{2,})$/;
siteName.addEventListener("input", validateSiteName);
 function validateSiteName() {
 validateInput(siteName,regexName);
}
siteURL.addEventListener("input", validateURL);
 function validateURL() {
  validateInput(siteURL,regexURL);
}

//Close LightBox
closeBtn.addEventListener("click", closeTab);
function closeTab() {
lightBoxContainer.classList.replace("d-flex","d-none");
}