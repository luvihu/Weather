function plana() {
  for (let i = 0; i <= 100; i = i + 1) {
    document.write("<br>" + i + ".- NO debo olvidar mi cuaderno <br>");
  }
}
plana();

function isPrimeNumber(number) {
  for (let i = 2; i < number; i = i + 1) {
    if (number % i === 0) {
      return false;
    }
  }
  return number > 1;
}

gracias = isPrimeNumber(6);

console.log(gracias);
