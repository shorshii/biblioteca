import Handlebars from 'handlebars';
import { guid } from '../../utils';

import template from './template.html';

let mensaje = '';
let pepe = "";
let database;

export default (_database) => {
  database = _database;
  render();
};

const ingresarNuevoLibro = (e) => {

  e.preventDefault();

  const nvoLibro = {
    id: guid(),
    libro: document.getElementById('libro').value,
    genero: document.getElementById('genero').value,
    autor: document.getElementById('autor').value,
    portada: document.getElementById('portada').value,
    descripcion: document.getElementById('descripcion').value,
  };
  console.log(nvoLibro);
  database.ref(`nvoLibro/${nvoLibro.id}`).set({
    libro: nvoLibro.libro,
    genero: nvoLibro.genero,
    autor: nvoLibro.autor,
    portada: nvoLibro.portada,
    descripcion: nvoLibro.descripcion,
  })
  .then(() => {
    mensaje = 'Libro cargado correctamente!';
    render();
  });

  return false;
}
const render = () => {
	const t = Handlebars.compile(template);
	document.getElementById('main').innerHTML = t({mensaje});
	document.getElementById('boton-nuevo').onclick = ingresarNuevoLibro;
}
