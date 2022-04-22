// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from 'https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBOw53a6C_N7WYrIER1P88ILTjFEyLpXM4',
  authDomain: 'lostark-5785c.firebaseapp.com',
  databaseURL: 'https://lostark-5785c-default-rtdb.firebaseio.com',
  projectId: 'lostark-5785c',
  storageBucket: 'lostark-5785c.appspot.com',
  messagingSenderId: '153964125265',
  appId: '1:153964125265:web:dfef65931ccc5c6d192c70',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore();

/**
 * Personaje
 * @param {string} idPersonaje
 * @param {string} nombre
 * @param {string} clase
 */

/**
 * Calendario
 * @param {string} nombre
 * @param {string} idCalendario
 */

/**
 * Evento
 * @param {string} idEvento
 * @param {string} dia
 * @param {string} hora
 * @param {string} idEventoCalendario
 * @param {string} idCalendarioPersonaje
 */

//Personajes *****************************

//Get
export const onGetPersonajes = callback =>
  onSnapshot(collection(db, 'personajes'), callback);

export const getPersonajes = () => getDocs(collection(db, 'personajes'));

// Save
export const savePersonaje = (nombre, clase) =>
  addDoc(collection(db, 'personajes'), { nombre, clase });

//Delete
export const deletePersonaje = idPersonaje =>
  deleteDoc(doc(db, 'personajes', idPersonaje));

//Update
export const updatePersonaje = (idPersonaje, newFields) =>
  updateDoc(doc(db, 'personajes', idPersonaje), newFields);

//Get by id
export const getPersonaje = idPersonaje =>
  getDoc(doc(db, 'personajes', idPersonaje));

//*****************************
