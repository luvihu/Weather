const defaultDateOptions = {
  day: "numeric",
  weekday: "long",
  month: "long",
};

export function formatDate(date, options = defaultDateOptions) {
  return new Intl.DateTimeFormat("es", options).format(date);
}

/* como solo voy a exportar esta funcion, ya no uso el export default, solo uso
el export*/

export function formatTemp(value) {
  return `${Math.floor(value)}°`;
}

/*Math.floor() devuelve el numero entero redondeado más bajo */
