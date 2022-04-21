//Elemento

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

//Botones
const btnCerrar = document.getElementById('cerrar');

// Evento
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

// Execution
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
  claseSelecionada.textContent = claseElegida;
  divNuevoPersonaje.style.display = 'flex';
}

function cerrarNuevoPersonaje() {
  const divNuevoPersonaje = document.getElementById('nuevo-personaje');
  divNuevoPersonaje.style.display = 'none';
}
