const input = document.querySelector(".js-input");
const button = document.querySelector(".js-button");
let countryEl = document.querySelector(".js-country");
let confirmedEl = document.querySelector(".js-confirmed");
let deathsEl = document.querySelector(".js-deaths");
let recoveredEl = document.querySelector(".js-recovered");
let activeEl = document.querySelector(".js-active");
const horror = document.querySelector(".js-horror");
const dataContent = document.querySelector(".js-data");


async function getCases() {
  let country = input.value;
  if(country.length == 0){
    dataContent.style.display = "none";
    horror.style.display = "block";
    return 
  }
  try {
    
    const responseData = await fetch(`https://api.covid19api.com/total/country/${country}`);
    const data = await responseData.json();

    const lastElement = data[data.length -1];
    console.log(lastElement)
    if(data.message && data.message == "Not Found" || typeof data != "object") {
      dataContent.style.display = "none";
      horror.style.display = "block";
      console.log("El país ingresado no existe");
    } else {
      dataContent.style.display = "block";
      horror.style.display = "none";
      input.value = null;
      countryEl.innerHTML = lastElement.Country;
      confirmedEl.innerHTML = lastElement.Confirmed;
      deathsEl.innerHTML = lastElement.Deaths;
      recoveredEl.innerHTML = lastElement.Recovered;
      activeEl.innerHTML = lastElement.Active;
    }
  } catch (error) {
  console.log("Ocurrió un error");
  console.log(error);
}
}

button.addEventListener("click", getCases);

input.addEventListener("keyup", function(event){
  if (event.keyCode == 13) {
    return getCases();
  }
});