import React, { useState, useEffect } from 'react';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import NoLogin from '../components/NoLogin';
import Loading from '../components/Loading';

import FirestoreService from '../utils/services/FirestoreService';

function Calendario(props) {
  const [usuario, setUsuario] = useState(null);
  const [calendarios, setCalendarios] = useState([]);
  const [personajes, setPersonajes] = useState([]);
  const [todosLosPersonajes, setTodosLosPersonajes] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  let personajesSeleccionados = new Array();
  let diasSeleccionados = new Array();

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      setUsuario(user.uid);
      //console.log('Usuario', usuario);
    } else {
      setUsuario(null);
    }
  });

  function fetchPersonajes() {
    FirestoreService.getPersonajes(usuario)
      .then(response => {
        setPersonajes(response._delegate._snapshot.docChanges);
        //console.log('Personajes', personajes);
      })
      .catch(e => {
        //console.log(e);
        alert('Error al cargar personajes: ' + e);
      });
  }

  function fetchPersonaje(id) {
    FirestoreService.getPersonaje(id)
      .then(response => {
        //setEvento(response._delegate._document.data.value.mapValue.fields);
      })
      .catch(e => {
        //console.log(e);
        alert('Error al cargar personajes: ' + e);
      });
  }

  function fetchCalendarios() {
    setIsLoading(true);
    FirestoreService.getCalendarios()
      .then(response => {
        setCalendarios(response._delegate._snapshot.docChanges);
        //console.log('Calendarios:', calendarios);
      })
      .catch(e => {
        //console.log('Calendarios:', calendarios);
        alert('Error al cargar calendarios: ' + e);
      });
  }

  function fetchTodosLosPersonajes() {
    FirestoreService.getTodosPersonajes()
      .then(response => {
        setTodosLosPersonajes(response._delegate._snapshot.docChanges);
        console.log(todosLosPersonajes);
        setIsLoading(false);
      })
      .catch(e => {
        console.log(e);
        setIsLoading(false);
        alert('Error al cargar todos los personajes: ' + e);
      });
  }

  useEffect(
    () => {
      if (usuario !== null) {
        fetchCalendarios();
        fetchPersonajes();
        fetchTodosLosPersonajes();
      }
    },
    [usuario],
  );

  function eliminarPersonaje(personaje) {
    const nombrePersonaje =
      personaje.doc.data.value.mapValue.fields.nombre.stringValue;
    var confirmacion = window.confirm(
      '¿Estás seguro de que quieres eliminar el personaje ' +
        nombrePersonaje +
        '?',
    );
    if (confirmacion) {
      const idPersonaje =
        personaje.doc.key.path.segments[
          personaje.doc.key.path.segments.length - 1
        ];
      FirestoreService.deletePersonaje(idPersonaje)
        .then(() => {
          setIsLoading(false);
          refreshPage();
        })
        .catch(e => {
          alert('Error occured: ' + e.message);
          setIsLoading(false);
        });
    } else {
    }
  }

  function refreshPage() {
    window.location.reload(false);
  }

  function personajesId(personajes, html) {
    personajes.forEach((personaje, index) => {
      //console.log('Evento en fetch:', personaje.stringValue, '/', evento);
      html = html + '<div class="div-mi-personaje">';
      todosLosPersonajes.forEach((personajeGeneral, index) => {
        var personajeGeneralId =
          personajeGeneral.doc.key.path.segments[
            personajeGeneral.doc.key.path.segments.length - 1
          ];
        if (personajeGeneralId === personaje.stringValue) {
          console.log(personajeGeneralId, '--', personaje.stringValue);
          html =
            html +
            '<img src="' +
            personajeGeneral.doc.data.value.mapValue.fields.icono.stringValue +
            '" alt="' +
            personajeGeneral.doc.data.value.mapValue.fields.nombre.stringValue +
            '" />';

          html =
            html +
            '<div class="div-informacion-mi-personaje"><h4>' +
            personajeGeneral.doc.data.value.mapValue.fields.nombre.stringValue +
            '</h4>';
          html =
            html +
            '<p>' +
            personajeGeneral.doc.data.value.mapValue.fields.clase.stringValue +
            '</p>';
          html = html + '</div><button class="btn-delete">X</button></div>';
        }
      });
      html = html + '</p></div>';
    });
    return html;
  }

  function selecionarPersonaje(personaje) {
    const idPersonaje =
      personaje.doc.key.path.segments[
        personaje.doc.key.path.segments.length - 1
      ];
    const divSelecionado = document.getElementById(idPersonaje);

    let personajeEncontrado = false;
    if (personajesSeleccionados != null) {
      personajesSeleccionados.forEach(function(currentValue, index, array) {
        if (currentValue === idPersonaje) {
          personajeEncontrado = true;
          divSelecionado.classList.remove('div-seleccionado');
          array.splice(index, 1);
        }
      });
    } else {
      divSelecionado.classList.add('div-seleccionado');
      personajesSeleccionados.push(idPersonaje);
    }
    if (!personajeEncontrado) {
      divSelecionado.classList.add('div-seleccionado');
      personajesSeleccionados.push(idPersonaje);
    }
    console.log(personajesSeleccionados);
  }

  const dibujarSemana = eventos => {
    var html = '<table>';
    const diasSemana = [
      'Lunes - 0',
      'Martes - 1',
      'Miércoles - 2',
      'Jueves - 3',
      'Viernes - 4',
      'Sábado - 5',
      'Domingo - 6',
    ];
    const horas = ['10:00', '11:00', '12:00', '13:00'];
    for (var filas = 0; filas < horas.length + 1; filas++) {
      html = html + '<tr>';
      for (var colum = 0; colum < diasSemana.length + 1; colum++) {
        if (filas === 0 && colum === 0) {
          html = html + '<th class="th-hora"></th>';
        } else if (filas === 0) {
          html = html + '<th class="th-dia">' + diasSemana[colum - 1] + '</th>';
        } else if (colum === 0) {
          html = html + '<th class="th-hora">' + horas[filas - 1] + '</th>';
        } else if (
          eventos.arrayValue.values != null &&
          eventos.arrayValue.values.length > 0
        ) {
          var eventoPintado = false;
          eventos.arrayValue.values.forEach((evento, index) => {
            const dia = evento.mapValue.fields.dia.stringValue;
            const hora = evento.mapValue.fields.hora.stringValue;
            var personajes =
              evento.mapValue.fields.personajes.arrayValue.values;
            if (dia == colum - 1 && hora == filas - 1) {
              html =
                html +
                '<td class="td-dia" id="\'' +
                (colum - 1) +
                '-' +
                (filas - 1) +
                '\'">';

              html = personajesId(personajes, html);

              html = html + '</div></td>';
              eventoPintado = true;
            }
          });
          if (!eventoPintado) {
            html =
              html +
              '<td class="td-dia" id="\'' +
              (colum - 1) +
              '-' +
              (filas - 1) +
              '\'"></td>';
          }
        } else {
          html =
            html +
            '<td class="td-dia" id="\'' +
            (colum - 1) +
            '-' +
            (filas - 1) +
            '\'"></td>';
        }
      }
      html = html + '</tr>';
    }
    html = html + '</table>';

    return (
      <div class="div-semana" dangerouslySetInnerHTML={{ __html: html }} />
    );
  };

  window.onload = function() {};

  return (
    <>
      {isLoading === true && <Loading />}
      {usuario === null && <NoLogin />}
      {usuario !== null && (
        <>
          <div class="div-calendarios">
            <h1>Calendarios</h1>
            {calendarios &&
              calendarios.map((calendario, index) => (
                <div
                  class="div-calendario"
                  id={
                    calendario.doc.key.path.segments[
                      calendario.doc.key.path.segments.length - 1
                    ]
                  }
                >
                  <h2>
                    Calendario:
                    {
                      calendario.doc.data.value.mapValue.fields.nombre
                        .stringValue
                    }
                  </h2>
                  {
                    //console.log(
                    //'Eventos:',
                    //calendario.doc.data.value.mapValue.fields.evento,)
                  }
                  <div class="div-mis-personajes">
                    <h3>MIS PERSONAJES</h3>
                    <div id="div-mis-personajes" />
                    {personajes &&
                      personajes.map((personaje, index) => (
                        <div
                          class="div-mi-personaje"
                          onClick={() => selecionarPersonaje(personaje)}
                          id={
                            personaje.doc.key.path.segments[
                              personaje.doc.key.path.segments.length - 1
                            ]
                          }
                        >
                          <img
                            src={
                              personaje.doc.data.value.mapValue.fields.icono
                                .stringValue
                            }
                            alt={
                              personaje.doc.data.value.mapValue.fields.nombre
                                .stringValue
                            }
                          />
                          <div class="div-informacion-mi-personaje">
                            <h4>
                              {
                                personaje.doc.data.value.mapValue.fields.nombre
                                  .stringValue
                              }
                            </h4>
                            <p>
                              {
                                personaje.doc.data.value.mapValue.fields.clase
                                  .stringValue
                              }
                            </p>
                          </div>
                          <button
                            class="btn-delete"
                            id={
                              personaje.doc.key.path.segments[
                                personaje.doc.key.path.segments.length - 1
                              ]
                            }
                            onClick={() => eliminarPersonaje(personaje)}
                          >
                            X
                          </button>
                        </div>
                      ))}
                  </div>
                  {// (document.getElementById(
                  //   'div-mi-calendario',
                  // ).innerHTML = dibujarSemana())
                  dibujarSemana(
                    calendario.doc.data.value.mapValue.fields.evento,
                  )}
                </div>
              ))}
          </div>
        </>
      )}
    </>
  );
}

export default Calendario;
