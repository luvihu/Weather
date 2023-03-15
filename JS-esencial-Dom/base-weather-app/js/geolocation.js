function geolocationSupport() {
  // if ("geolocation" in navigator) {
  //   return true;
  // }
  // return false;
  return "geolocation" in navigator; /* es lo mismo q la sintaxis de arriba*/
}

const defaultOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 100000,
};

function getCurrentPosition(options = defaultOptions) {
  if (!geolocationSupport()) throw new Error("No hay soporte en tu navegador");
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // recibe como parametro una function, getCurrentPosition es una propiedad/metodo
        console.log(position);
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        // resolve({ lat, lon }); //resolve solo puede tner un valor, por ello se coloca como objeto
        resolve(position); // al generar otra funcion (getLatLon) exclusiva para q llame la position
        // console.log(lat, lon);
        // console.log("esto es getCurrentPosition");
      },
      () => {
        reject("No se ha podido encontrar tu ubicación");
      },
      options
    );
  });
}
/*El getCurrentPosition, tiene 3 parámetros: position(cuando las cosas pasan bien), reject(cuando las cosas pasan mal)
 y cuando no pasa ninguno de los anteriores, en este ejemplo lo colocamos como options, el cual lo pusimos como parámetro de
 la funcion getCurrentPosition(options = defaultOptions), para que así si queremos cambiar algun valor del objeto
 defaultOptions se pueda modificar en el parentesis de--->  await getCurrentPosition() , se encuentra exportado en
 el módulo: current-weather.js */

export async function getLatLon(options = defaultOptions) {
  try {
    const {
      coords: { latitude: lat, longitude: lon },
    } = await getCurrentPosition(options);

    return { lat, lon, isError: false };
  } catch {
    return { isError: true };
  }
}
/* se crea una funcion getLatLon /funcion indirecta/ el cual llama a getCurrentPosition /funcion directa/, solo para q llame a lat y lon, porq el metodo getCurrentPosition tiene otras dos propiedades
más aparte de la localizacion*/
