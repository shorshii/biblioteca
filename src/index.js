import Navigo from 'navigo';
import firebase from 'firebase';
import catchLinks from 'catch-links';

import login from './modulos/login';
import listar from './modulos/listar';
import buscar from './modulos/buscar';
import nuevo from './modulos/nuevo';

import firebaseConfig from '../firebase.config';

import './index.scss';

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

var root = null;
var useHash = false;

var router = new Navigo(root, useHash);

router
	.on({
		'login': () => login(database),
		'listar': () => listar(database),
		'nuevar': () => nuevo(database),
		'buscar': () => buscar(database),
			})
	.resolve();

catchLinks(window, function (href) {
    router.navigate(href);
});
