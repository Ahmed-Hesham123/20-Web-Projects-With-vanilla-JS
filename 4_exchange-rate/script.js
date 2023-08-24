const currencyEl_one = document.getElementById("currency-one");
const amountEl_one = document.getElementById("amount-one");
const currencyEl_two = document.getElementById("currency-two");
const amountEl_two = document.getElementById("amount-two");

const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");

// Fetch exchange rates and update the DOM
function calculate() {
  const currencyOne = currencyEl_one.value;
  const currencyTwo = currencyEl_two.value;
  const amountOne = amountEl_one.value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${currencyOne}`)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data)
      const rate = data.rates[currencyTwo];

      rateEl.innerText = `1 ${currencyOne} = ${rate} ${currencyTwo}`;
      amountEl_two.value = (amountEl_one.value * rate).toFixed(2);

      // Save selected currencies to local storage
      localStorage.setItem("currencyOne", currencyOne);
      localStorage.setItem("currencyTwo", currencyTwo);
      localStorage.setItem("amountOne", amountOne);
    });
}

// Load selected currencies from local storage
// if (localStorage.getItem("currencyOne")) {
//   currencyEl_one.value = localStorage.getItem("currencyOne");
// }

// if (localStorage.getItem("currencyTwo")) {
//   currencyEl_two.value = localStorage.getItem("currencyTwo");
// }

// if (localStorage.getItem("amountOne")) {
//   amountEl_one.value = localStorage.getItem("amountOne");
// }

if (
  localStorage.getItem("currencyOne") &&
  localStorage.getItem("currencyTwo") &&
  localStorage.getItem("amountOne")
) {
  currencyEl_one.value = localStorage.getItem("currencyOne");
  currencyEl_two.value = localStorage.getItem("currencyTwo");
  amountEl_one.value = localStorage.getItem("amountOne");
}

// Event listeners
currencyEl_one.addEventListener("change", calculate);
amountEl_one.addEventListener("input", calculate);
currencyEl_two.addEventListener("change", calculate);
amountEl_two.addEventListener("input", calculate);

swap.addEventListener("click", () => {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  calculate();
});

calculate();
