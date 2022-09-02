let title = window.title;
let price = window.price;
let taxes = window.taxes;
let ads = window.ads;
let discount = window.discount;
let total = window.total;
let count = window.count;
let category = window.category;
let create = window.create;

let mood = "create";
let tmp;
//total price

const totalPrice = () => {
  total.innerHTML = `${
    +price.value + +taxes.value + +ads.value - +discount.value
  }$`;
  if (total.innerHTML == "0$" || Number.parseFloat(total.innerHTML) < 0) {
    total.style.backgroundColor = "#f95757";
  } else {
    total.style.backgroundColor = "rgb(79, 190, 64)";
  }
};

//Clear Inputs
const clearData = () => {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  count.value = "";
  total.innerHTML = "0$";
  category.value = "";
  total.style.backgroundColor = "#f95757";
};

// create product
let dataPro;

if (window.localStorage.data == null) {
  dataPro = [];
} else {
  dataPro = JSON.parse(window.localStorage.data);
}

//onSubmit

const getData = () => {
  let newPro = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };
  if (title.value != "" && category.value != "" && price.value != "") {
    if (mood == "create") {
      if (Number.parseInt(count.value) > 1) {
        for (let i = 0; i < Number.parseInt(count.value); i++) {
          dataPro.push(newPro);
        }
      } else {
        dataPro.push(newPro);
      }
    } else {
      dataPro[tmp] = newPro;
      total.style.backgroundColor = "#f95757";
      create.innerText = "Create";
      mood = "create";
      count.removeAttribute("style");
    }
    clearData();
  }
  window.localStorage.setItem("data", JSON.stringify(dataPro));
  showData();
  checkTable();
};

// create.addEventListener("click", getData);

//Showing Data in body

const showData = () => {
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    table += `
      <tr>
      <td>${i + 1}</td>
      <td>${dataPro[i].title}</td>
      <td>${dataPro[i].price}</td>
      <td>${dataPro[i].taxes}</td>
      <td>${dataPro[i].ads}</td>
      <td>${dataPro[i].discount}</td>
      <td>${dataPro[i].total}</td>
      <td>${dataPro[i].category}</td>
      <td><button type="button" class="delete" numinarr = "${i}">Delete</button></td>
      <td><button type="button" class="update"  numinarr = "${i}">Update</button></td>
    </tr>`;
  }
  window.tbody.innerHTML = table;
};

showData();

//delete Item

const deleteItem = (e) => {
  if (e.target.getAttribute("class") == "delete") {
    let index = e.target.getAttribute("numinarr");
    dataPro.splice(index, 1);
    window.localStorage.setItem("data", JSON.stringify(dataPro));
    showData();
    checkTable();
  }
};

addEventListener("click", deleteItem);

//Delete All
let deleteAllBtn = window.deleteAll;

const checkTable = () => {
  if (window.tbody.innerHTML == "") {
    deleteAllBtn.setAttribute("style", "display: none");
  } else {
    deleteAllBtn.innerText = `Delete All (${dataPro.length})`;
    deleteAllBtn.removeAttribute("style");
  }
};

checkTable();

const deleteAllEle = () => {
  dataPro.splice(0);
  window.localStorage.setItem("data", JSON.stringify(dataPro));
  deleteAllBtn.removeAttribute("style");
  deleteAllBtn.setAttribute("style", "display: none");
  showData();
};

deleteAllBtn.addEventListener("click", deleteAllEle);

//Update btn

//      Upload Data to Inputs
const uploadData = (zArr) => {
  title.value = zArr.title;
  price.value = zArr.price;
  taxes.value = zArr.taxes;
  ads.value = zArr.ads;
  discount.value = zArr.discount;
  count.setAttribute("style", "display: none");
  total.innerHTML = zArr.total;
  category.value = zArr.category;
  total.style.backgroundColor = "rgb(79, 190, 64)";
  create.innerText = "Update";
};

const updateBtnHolder = (e) => {
  if (e.target.getAttribute("class") == "update") {
    const i = e.target.getAttribute("numinarr");
    tmp = i;
    mood = "update";
    uploadData(dataPro[i]);
    scroll({
      top: 0,
      behavior: "smooth",
    });
  }
};

addEventListener("click", updateBtnHolder);

//Search

const searchInput = window.search;
const searchCat = window.srcCat;
const searchTit = window.srcTitle;

const searchMethod = (mood) => {
  let table = "";
  for (let i in dataPro) {
    if (mood === "tit") {
      if (
        dataPro[i].title.toLowerCase().includes(searchInput.value.toLowerCase())
      ) {
        table += `
            <tr>
            <td>${+i + 1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button type="button" class="delete" numinarr = "${i}">Delete</button></td>
            <td><button type="button" class="update"  numinarr = "${i}">Update</button></td>
          </tr>`;
      }
    } else {
      if (
        dataPro[i].category
          .toLowerCase()
          .includes(searchInput.value.toLowerCase())
      ) {
        table += `
            <tr>
            <td>${+i + 1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button type="button" class="delete" numinarr = "${i}">Delete</button></td>
            <td><button type="button" class="update"  numinarr = "${i}">Update</button></td>
          </tr>`;
      }
    }
  }
  window.tbody.innerHTML = table;
};

const search = (e) => {
  if (e.target.getAttribute("class") == "search") {
    if (e.target.id == "srcCat") {
      searchMethod("cat");
    } else {
      searchMethod("tit");
    }
    if (searchInput.value == "") {
      searchInput.focus();
    }
  }
};

addEventListener("click", search);
