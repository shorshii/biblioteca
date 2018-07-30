
import Handlebars from 'handlebars';

import template from './template.html';

let database;
let mensaje="";
let mostrarLibros = [];

export default (_database) => {
	database = _database;
	mostrarLibros = [];
	listaDeLibros();
}

const listaDeLibros = () => {
	const lista = database.ref("nvoLibro/")
					.once("value")
					.then((datos_libro) => {
						datos_libro.forEach((element) => {
							const datosLibro = element.val();
							console.log(datosLibro);
							datosLibro.id = element.key;
							mostrarLibros.push(datosLibro);
						});
						render();
					});
}

const render = () => {
	const t = Handlebars.compile(template);
	document.getElementById('main').innerHTML = t({ mostrarLibros});
}
