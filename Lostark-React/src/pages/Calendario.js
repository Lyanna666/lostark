import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import NotLoggedInView from '../components/NoLoggedInView';

import FirestoreService from '../utils/services/FirestoreService';

function Calendario(props) {
  const [usuario, setUsuario] = useState(null);
  const [calendarios, setCalendarios] = useState([]);
  const [eventos, setEventos] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      setUsuario(user);
    } else {
      setUsuario(null);
    }
  });

  function fetchCalendarios() {
    setIsLoading(true);
    FirestoreService.getCalendarios()
      .then(response => {
        setIsLoading(false);
        setCalendarios(response._delegate._snapshot.docChanges);
        console.log(calendarios);
      })
      .catch(e => {
        setIsLoading(false);
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

  return (
    <>
      {usuario === null && <NotLoggedInView />}
      {isLoading === true && <Spinner animation="border" variant="secondary" />}
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
                </div>
              ))}
          </div>
        </>
      )}
    </>
  );
}

export default Calendario;
