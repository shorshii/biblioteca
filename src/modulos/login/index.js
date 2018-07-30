var provider = new firebase.auth.GoogleAuthProvider();
import Handlebars from 'handlebars';

import template from './template.html';

let database;
let loggeo ="";

export default (_database) => {
	database = _database;
	render();
}

//function guardarDatos(user){
//$('#login').click(function(){
const guardar = () => {
    firebase.auth()
    .signInWithPopup(provider)
    .then(function(result) {
    console.log(result.user);
    //$('#login').hide(); //ocultar el boton
    guardarDatos(result.user);
    window.location.href = '/listar';
    //$('#root').append("<img width= 100px src= '"+result.user.photoURL+"' />")//agregar html a la etiqueta html
		//$('#root').append(result.user.displayName)
    });
};
function guardarDatos(user){
  var usuario = {
    uid: user.uid,
    nombre: user.displayName,
    email: user.email,
    foto: user.photoURL
  }
  firebase.database().ref("registro/" + user.uid)
  .set(usuario)
  // set modifica esa llave push lo agregaria como uno nuevo.
}

const render = () => {
	const t = Handlebars.compile(template);
  document.getElementById('header').innerHTML = "";
  document.getElementById('main').innerHTML = t({loggeo});
  document.getElementById('boton-nuevo').onclick = guardar;
}
