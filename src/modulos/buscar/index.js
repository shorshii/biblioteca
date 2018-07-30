
import Handlebars from 'handlebars';

import template from './template.html';

let database;

let buscarLibros = [];

export default (_database) => {
	database = _database;
	buscarLibros = [];
	render();
}

const listaBuscarLibros =() => {
	const buscarFld = document.getElementById('fBuscar').value;
	const lista = database.ref("nvoLibro/")
	.once("value")
	.then((datos_libro) => {
		datos_libro.forEach((element) => {
			const datosLibro = element.val();
			console.log(datosLibro);
			datosLibro.id = element.key;
			if(datosLibro.genero == buscarFld || datosLibro.libro == buscarFld || datosLibro.autor == buscarFld  ){
				buscarLibros.push(datosLibro);
			}

		});
		render();
	});
}

const render = () => {
	const t = Handlebars.compile(template);
	document.getElementById('main').innerHTML = t({ buscarLibros});
	document.getElementById('boton-nuevo').onclick = listaBuscarLibros;
}
