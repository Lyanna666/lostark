import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import NoLogin from '../components/NoLogin';
import Loading from '../components/Loading';

import FirestoreService from '../utils/services/FirestoreService';

function Calendario(props) {
  const [usuario, setUsuario] = useState(null);
  const [calendarios, setCalendarios] = useState([]);
  const [eventos, setEventos] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      setUsuario(user);
      console.log('User:', user);
      console.log('Usuario', usuario);
    } else {
      setUsuario(null);
    }
  });

  function fetchCalendarios() {
    setIsLoading(true);
    FirestoreService.getCalendarios()
      .then(response => {
        setCalendarios(response._delegate._snapshot.docChanges);
        console.log('Calendarios:', calendarios);
        setIsLoading(false);
      })
      .catch(e => {
        setIsLoading(false);
        console.log('Calendarios:', calendarios);
        alert('Error al cargar calendarios: ' + e);
      });
  }

  useEffect(
    () => {
      if (usuario !== null) {
        fetchCalendarios();
      }
    },
    [usuario],
  );

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
    const horas = ['0', '1', '2', '3'];
    for (var filas = 0; filas < 5; filas++) {
      html = html + '<tr>';
      for (var colum = 0; colum < 8; colum++) {
        if (filas === 0 && colum === 0) {
          html = html + '<th></th>';
        } else if (filas === 0) {
          html = html + '<th>' + diasSemana[colum - 1] + '</th>';
        } else if (colum === 0) {
          html = html + '<td>' + horas[filas - 1] + '</td>';
        } else if (eventos != null && eventos.length > 0) {
          var eventoPintado = false;
          eventos.map((evento, index) => {
            const dia = evento.mapValue.fields.dia.stringValue;
            const hora = evento.mapValue.fields.hora.stringValue;
            if (dia == colum - 1 && hora == filas - 1) {
              html =
                html +
                '<td id="\'' +
                (colum - 1) +
                '-' +
                (filas - 1) +
                '\'">' +
                dia +
                '-' +
                hora +
                '</td>';
              eventoPintado = true;
            }
          });
          if (!eventoPintado) {
            html =
              html +
              '<td id="\'' +
              (colum - 1) +
              '-' +
              (filas - 1) +
              '\'"></td>';
          }
        } else {
          html =
            html + '<td id="\'' + (colum - 1) + '-' + (filas - 1) + '\'"></td>';
        }
      }
      html = html + '</tr>';
    }
    html = html + '</table>';

    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  };

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
                  clas="div-calendario"
                  id={
                    calendario.doc.key.path.segments[
                      calendario.doc.key.path.segments.length - 1
                    ]
                  }
                >
                  <div>
                    <h2>
                      Calendario:
                      {
                        calendario.doc.data.value.mapValue.fields.nombre
                          .stringValue
                      }
                    </h2>
                    {console.log(
                      'Eventos:',
                      calendario.doc.data.value.mapValue.fields.evento,
                    )}
                  </div>
                  {calendario.doc.data.value.mapValue.fields.evento.arrayValue
                    .values &&
                    calendario.doc.data.value.mapValue.fields.evento.arrayValue.values.map(
                      (evento, index) => (
                        <div>
                          {console.log('Evento ', index, ':', evento)}
                          <h3>
                            Evento:{evento.mapValue.fields.dia.stringValue}/
                            {evento.mapValue.fields.hora.stringValue}
                          </h3>
                        </div>
                      ),
                    )}
                  <div id="div-mi-calendario">
                    {// (document.getElementById(
                    //   'div-mi-calendario',
                    // ).innerHTML = dibujarSemana())
                    dibujarSemana(
                      calendario.doc.data.value.mapValue.fields.evento
                        .arrayValue.values,
                    )}
                  </div>
                </div>
              ))}
          </div>
        </>
      )}
    </>
  );
}

export default Calendario;
