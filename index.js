import {
  onGetPersonajes,
  savePersonaje,
  deletePersonaje,
  getPersonaje,
  updatePersonaje,
  getPersonajes,
} from './firebase.js';

let editStatus = false;
let id = '';

//Divs de las clases, esto lo tengo que pasar a botones en un futuro
const btnBERSERKER = document.getElementById('BERSERKER');
const btnHOLYKNIGHT = document.getElementById('HOLY_KNIGHT');
const btnWARLORD = document.getElementById('WARLORD');
const btnSTRIKER = document.getElementById('STRIKER');
const btnWARDANCE = document.getElementById('WARDANCER');
const btnSCRAPPER = document.getElementById('SCRAPPER');
const btnSOULFITS = document.getElementById('SOULFIST');
const btnGLAIVIER = document.getElementById('GLAIVIER');
const btnGUNSLINGER = document.getElementById('GUNSLINGER');
const btnDEADEYE = document.getElementById('DEADEYE');
const btnSHARPSHOOTER = document.getElementById('SHARPSHOOTER');
const btnARTILLERIST = document.getElementById('ARTILLERIST');
const btnBARD = document.getElementById('BARD');
const btnSORCERESS = document.getElementById('SORCERESS');
const btnDEATHBLADE = document.getElementById('DEATHBLADE');
const btnSHADOWHUNTER = document.getElementById('SHADOWHUNTER');

const divPersonajes = document.getElementById('div-mis-personajes');

const btnCerrar = document.getElementById('cerrar');
const formCrearPersonaje = document.getElementById('form-crear-personaje');

//On click events ***********************
btnBERSERKER.onclick = nuevoPersonaje;
btnWARLORD.onclick = nuevoPersonaje;
btnHOLYKNIGHT.onclick = nuevoPersonaje;
btnSTRIKER.onclick = nuevoPersonaje;
btnWARDANCE.onclick = nuevoPersonaje;
btnSCRAPPER.onclick = nuevoPersonaje;
btnGLAIVIER.onclick = nuevoPersonaje;
btnSOULFITS.onclick = nuevoPersonaje;
btnGUNSLINGER.onclick = nuevoPersonaje;
btnDEADEYE.onclick = nuevoPersonaje;
btnSHARPSHOOTER.onclick = nuevoPersonaje;
btnARTILLERIST.onclick = nuevoPersonaje;
btnBARD.onclick = nuevoPersonaje;
btnSORCERESS.onclick = nuevoPersonaje;
btnSHADOWHUNTER.onclick = nuevoPersonaje;
btnDEATHBLADE.onclick = nuevoPersonaje;
btnCerrar.onclick = cerrarNuevoPersonaje;
//***********************

function nuevoPersonaje() {
  const divNuevoPersonaje = document.getElementById('nuevo-personaje');
  const divNuevoPersonajeImagen = document.getElementById(
    'nuevo-personaje-background',
  );
  const claseSelecionada = document.getElementById('clase-selecionada');

  const claseElegida = this.id;

  alert('Has elegido la clase: ' + claseElegida);

  divNuevoPersonajeImagen.style.backgroundImage =
    'url(../resources/Clases/' + claseElegida + '-background.jpeg)';
  claseSelecionada.value = claseElegida;
  divNuevoPersonaje.style.display = 'flex';
}

function cerrarNuevoPersonaje() {
  const divNuevoPersonaje = document.getElementById('nuevo-personaje');
  divNuevoPersonaje.style.display = 'none';
}

formCrearPersonaje.addEventListener('submit', async e => {
  e.preventDefault();

  const nombre = formCrearPersonaje['nombre'];
  const clase = formCrearPersonaje['clase-selecionada'];

  try {
    if (!editStatus) {
      await savePersonaje(nombre.value, clase.value);
    } else {
      await updatePersonaje(id, {
        nombre: nombre.value,
        clase: clase.value,
      });

      editStatus = false;
      id = '';
    }

    formCrearPersonaje.reset();
    cerrarNuevoPersonaje();
  } catch (error) {
    console.log(error);
  }
});

window.addEventListener('DOMContentLoaded', async e => {
  const querySnapshot = await getPersonajes();
  querySnapshot.forEach(doc => {
    console.log(doc.data());
  });

  onGetPersonajes(querySnapshot => {
    divPersonajes.innerHTML = '';

    querySnapshot.forEach(doc => {
      const personaje = doc.data();
      const claseMinusculas = personaje.clase.toLowerCase();

      divPersonajes.innerHTML += `
      <div class="div-mi-personaje">
      <img src="../resources/Clases/ICONS/ClassIcon-${claseMinusculas}.webp"/>
       <h4>${personaje.nombre}</h4>
    <p>${personaje.clase}</p>
      <button class="btn-delete" data-id="${doc.id}">
      Eliminar
      </button>
    </div>`;
    });

    const btnsDelete = divPersonajes.querySelectorAll('.btn-delete');
    btnsDelete.forEach(btn =>
      btn.addEventListener('click', async ({ target: { dataset } }) => {
        try {
          await deletePersonaje(dataset.id);
        } catch (error) {
          console.log(error);
        }
      }),
    );

    const btnsEdit = divPersonajes.querySelectorAll('.btn-edit');
    btnsEdit.forEach(btn => {
      btn.addEventListener('click', async e => {
        try {
          const doc = await getPersonaje(e.target.dataset.id);
          const personaje = doc.data();
          formCrearPersonaje['nombre'].value = personaje.nombre;
          formCrearPersonaje['clase'].value = personaje.clase;

          editStatus = true;
          id = doc.id;
        } catch (error) {
          console.log(error);
        }
      });
    });
  });
});
