const currencyEl_one = document.getElementById('currency-one'); // on prend le premier select
const currencyEl_two = document.getElementById('currency-two'); // on prend le deixème select
const amountEl_one = document.getElementById('amount-one'); // on prend le premier inout 
const amountEl_two = document.getElementById('amount-two'); // on prend le deuxième input

const rateEl = document.getElementById('rate'); // c'est le div vide du texte injecter 
const swap = document.getElementById('swap'); // btn 

// Fetch exchange rates and update the dome
// creation d'une fonction calculate 
function calculate() {
  const currency_one = currencyEl_one.value; // on met la valeur recuperer et on la met dans la constante
  const currency_two = currencyEl_two.value;

  fetch(`https://v6.exchangerate-api.com/v6/e47663ea3689ef0b780ea249/latest/${currency_one}`) // envoi un requette get a l'url
    .then((res) => res.json()) // then est utiliser pr traiter la réponse res puis on la convertit en objet json 
    .then((data) => {
      //   console.log(data);
      const rate = data.conversion_rates[currency_two];


      /*Pour mieux conprendre data.convertion_rate
      const data = {
  conversion_rates: {
    USD: 1.23,
    EUR: 0.89,
    GBP: 0.76
  }
};

const rate = data.conversion_rates['USD'];
console.log(rate); // Affiche 1.23
 */


      rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`; // injection du texte avec le taux de convertion 

      amountEl_two.value = (amountEl_one.value * rate).toFixed(2); // convertion + arrandi a deux décimal apres la virgule
    });
}

// Event Listeners
currencyEl_one.addEventListener('change', calculate); // la fonction calculate sera appelée lorsque la valeur de currencyEl_one change.
amountEl_one.addEventListener('input', calculate); // la fonction calculate sera appelée lorsque la valeur de amountEl_one change.
currencyEl_two.addEventListener('change', calculate);
amountEl_two.addEventListener('input', calculate);
swap.addEventListener('click', () => {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  calculate();
});

calculate();