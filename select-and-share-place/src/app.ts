import axios from 'axios';
import { Loader, Library } from "@googlemaps/js-api-loader"

const GOOGLE_API_KEY = process.env.GOOGLE_API!;
const GOOGLE_URL = "https://maps.googleapis.com/maps/api/geocode/json?"
const googleKeyString = `key=${GOOGLE_API_KEY}`;

const form = <HTMLFormElement>document.querySelector('form');
type GoogleGeocodingResponse = {
    results: [{geometry: {location: {lat:number, lng: number}}}],
    status: 'OK' | 'ZERO_RESULTS'
}

const loader = new Loader({
    apiKey: GOOGLE_API_KEY,
    version: "weekly",
});

loader.importLibrary("maps").then(() => {
    form.classList.remove("hidden");
});

form.addEventListener('submit', (event: SubmitEvent) => {
    event.preventDefault();
    const addressInput = <HTMLInputElement>document.getElementById('address');
    const addressString = encodeURI(addressInput.value);

    const url = `${GOOGLE_URL}address=${addressString}&${googleKeyString}`;

    axios.get<GoogleGeocodingResponse>(url)
        .then((response) => {

            if (response.data.status !== 'OK') {
                throw new Error('Clound not fetch location')
            }
            const coordinates = response.data.results[0].geometry.location!;

            const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
                center: coordinates,
                zoom: 13,
            });

            new google.maps.Marker({position: coordinates, map: map});

            console.log(coordinates)
        })
        .catch(error => {
            alert(error.message)
            console.log(error)
        })
});


