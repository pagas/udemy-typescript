const GOOGLE_API_KEY = process.env.GOOGLE_API;

const form = <HTMLFormElement>document.querySelector('form');
const addressInput = <HTMLInputElement>document.getElementById('address');

form.addEventListener('submit', (event: SubmitEvent) => {
    event.preventDefault();
    console.log("submit", addressInput.value);




});