import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';

import FirestoreService from '../utils/services/FirestoreService';

function Principal(props) {
  const [clases, setClases] = useState([]);
  const [personajes, setPersonajes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    FirestoreService.getSubclases()
      .then(response => {
        setClases(response._delegate._snapshot.docChanges);
        console.log('Clases:', clases);

        FirestoreService.getPersonajes()
          .then(response => {
            setIsLoading(false);
            setPersonajes(response._delegate._snapshot.docChanges);
            console.log('Personajes', personajes);
          })
          .catch(e => {
            setIsLoading(false);
            console.log(response);
            console.log(personajes);
            alert('Error al cargar personajes: ' + e);
          });
      })
      .catch(e => {
        setIsLoading(false);
        alert('Error al cargar las clases: ' + e);
      });
  }, []);

  function nuevoPersonaje(clase) {
    const divNuevoPersonaje = document.getElementById('nuevo-personaje');
    const divNuevoPersonajeImagen = document.getElementById(
      'nuevo-personaje-background',
    );
    const imgIcono = document.getElementById('img-icono');
    const claseSelecionada = document.getElementById('clase-selecionada');

    imgIcono.src = clase.doc.data.value.mapValue.fields.icono.stringValue;

    divNuevoPersonajeImagen.style.backgroundImage =
      'url(' +
      clase.doc.data.value.mapValue.fields.background.stringValue +
      ')';

    claseSelecionada.value =
      clase.doc.data.value.mapValue.fields.nombre.stringValue;
    divNuevoPersonaje.style.display = 'flex';
  }

  function cerrarNuevoPersonaje() {
    const divNuevoPersonaje = document.getElementById('nuevo-personaje');
    divNuevoPersonaje.style.display = 'none';
  }

  const guardarNuevoPersonaje = event => {
    event.preventDefault();
    setIsLoading(true);

    const formCrearPersonaje = document.getElementById('form-crear-personaje');
    const imgIcono = document.getElementById('img-icono');

    const nombre = formCrearPersonaje['nombre'].value;
    const clase = formCrearPersonaje['clase-selecionada'].value;
    const icono = imgIcono.src;
    alert(nombre + clase);
    FirestoreService.addPersonaje(nombre, clase, icono)
      .then(() => {
        alert(nombre + ' se ha añadido a tus personajes.');
        formCrearPersonaje.reset();
        cerrarNuevoPersonaje();
        setIsLoading(false);
        refreshPage();
      })
      .catch(e => {
        alert('Error occured: ' + e.message);
        setIsLoading(false);
      });
  };

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

  return (
    <>
      {isLoading === true && <Spinner animation="border" variant="secondary" />}
      <section class="section-clases">
        <h2 id="h2-personajes">PERSONAJES</h2>
        <div id="div-contenedor-personajes">
          <div class="div-mis-personajes">
            <h3>MIS PERSONAJES</h3>
            <div id="div-mis-personajes" />
            {personajes &&
              personajes.map((personaje, index) => (
                <div class="div-mi-personaje">
                  <img
                    src={
                      personaje.doc.data.value.mapValue.fields.icono.stringValue
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

          <div class="div-nuevo-personaje" id="nuevo-personaje">
            <div id="nuevo-personaje-background">
              <div class="div-nuevo-personaje-superior">
                <h3>NUEVO PERSONAJE</h3>
                <button
                  type="button"
                  id="cerrar"
                  class="btn-cerrar"
                  onClick={() => cerrarNuevoPersonaje()}
                >
                  X
                </button>
              </div>
              <div class="div-nuevo-personaje-centro">
                <img
                  id="img-icono"
                  class="img-icono"
                  src="https://cdn-icons-png.flaticon.com/512/786/786415.png"
                  alt="Icono not found"
                />
                <form
                  id="form-crear-personaje"
                  onSubmit={guardarNuevoPersonaje}
                >
                  <label for="clase-selecionada">Clase selecionada:</label>
                  <input
                    disabled="disabled"
                    type="text"
                    id="clase-selecionada"
                  />
                  <label for="nombre">Nombre del nuevo personaje:</label>
                  <input
                    type="text"
                    id="nombre"
                    placeholder="Nombre de tu nuevo personaje"
                  />
                  <button
                    type="submit"
                    id="crear-personaje"
                    onClick={() => cerrarNuevoPersonaje()}
                  >
                    Crear personaje
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div class="div-clases">
            <h3>NUEVO PERSONAJE</h3>
            {clases &&
              clases.map((clase, index) => (
                <div
                  class={clase.doc.data.value.mapValue.fields.clase.stringValue}
                  id={
                    clase.doc.key.path.segments[
                      clase.doc.key.path.segments.length - 1
                    ]
                  }
                  onClick={() => nuevoPersonaje(clase)}
                >
                  <picture>
                    <img
                      src={
                        clase.doc.data.value.mapValue.fields.imagen.stringValue
                      }
                      alt={
                        clase.doc.data.value.mapValue.fields.nombre.stringValue
                      }
                    />
                  </picture>
                  <div class="div-clase-informacion">
                    <picture>
                      <img
                        src={
                          clase.doc.data.value.mapValue.fields.icono.stringValue
                        }
                        alt={
                          clase.doc.data.value.mapValue.fields.nombre
                            .stringValue
                        }
                      />
                    </picture>
                    <h3>
                      {clase.doc.data.value.mapValue.fields.nombre.stringValue}{' '}
                    </h3>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Principal;
