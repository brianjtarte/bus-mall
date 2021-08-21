'use strict';

//global variables
let allProducts = [];

let myContainer = document.querySelector('section');

let image1 = document.querySelector('section img:first-child');
let image2 = document.querySelector('section img:nth-child(2)');
let image3 = document.querySelector('section img:nth-child(3)');
let indexArray = [];
let clicks = 0;
let clicksAllowed = 25;

function Products( name, fileExtension = 'jpg') {
  this.name = name;
  this.src = `img/${name}.${fileExtension}`;
  this.views = 0;
  this.clicks = 0;
  allProducts.push(this);
}
function selectRandomProduct() {
  return Math.floor(Math.random() * allProducts.length);
}


function renderProducts() {
  while (indexArray.length < 6) {
    let randomNumber = selectRandomProduct();
    if (!indexArray.includes(randomNumber)){
      indexArray.push(randomNumber);
    }
  }
  console.log(indexArray);
  let prod1 = indexArray.shift();
  let prod2 = indexArray.shift();
  let prod3 = indexArray.shift();


  image1.src = allProducts[prod1].src;
  image2.src = allProducts[prod2].src;
  image3.src = allProducts[prod3].src;
  image1.alt = allProducts[prod1].name;
  image2.alt = allProducts[prod2].name;
  image3.alt = allProducts[prod3].name;
  allProducts[prod1].views++;
  allProducts[prod2].views++;
  allProducts[prod3].views++;
  console.log(indexArray);
  
}
// creating storage
function storeAProduct () {
  let stringifyProducts = JSON.stringify(allProducts);
  localStorage.setItem('productstorage',stringifyProducts);
}
// check if local storage
function getProducts(){
  let potentialProducts = localStorage.getItem('productstorage');
  if(potentialProducts){
    let parsedProducts = JSON.parse(potentialProducts);
    allProducts = parsedProducts;
    
  }
}
function handleProductClick(event) {
  if (event.target === myContainer) {
    alert('Please click on an image');
  }
  clicks++;
  let clickedProduct = event.target.alt;
  console.log(clickedProduct);
  for (let i = 0; i < allProducts.length; i++) {
    if (clickedProduct === allProducts[i].name) {
      allProducts[i].clicks++;
      break;
    }
  }
  renderProducts();
  if (clicks === clicksAllowed) {
    myContainer.removeEventListener('click', handleProductClick);
    renderChart();
    storeAProduct();
  } 
  
 
}

new Products ('bag');
new Products ('banana');
new Products ('bathroom');
new Products ('boots');
new Products ('breakfast');
new Products ('bubblegum');
new Products ('chair');
new Products ('cthulhu');
new Products ('dog-duck');
new Products ('dragon');
new Products ('pen');
new Products ('pet-sweep');
new Products ('scissors');
new Products ('shark');
new Products ('sweep', 'png');
new Products ('tauntaun');
new Products ('unicorn');
new Products ('water-can');
new Products ('wine-glass');


renderProducts();

function renderChart() {
  let productClicks = [];
  let productViews = [];
  let productNames = [];
  for (let i = 0; i < allProducts.length; i++) {
    productNames.push(allProducts[i].name);
    productClicks.push(allProducts[i].clicks);
    productViews.push(allProducts[i].views);
  }
  
  let chartObject = {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [{
        label: '# of Views',
        data: productViews,
        backgroundColor: 'green',
        borderColor: 'green',
        borderWidth: 1
      },
      {
        label: '# of Clicks',
        data: productClicks,
        backgroundColor: 'violet',
        borderColor: 'violet',
        borderWidth: 1
        
      }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };
  let ctx = document.getElementById('myChart').getContext('2d');
  let myChart = new Chart(ctx, chartObject);
  
}

myContainer.addEventListener('click', handleProductClick);
getProducts();
