import React, { useState } from 'react';
import { Card, Form, Button, Image } from 'react-bootstrap';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

function Login(props) {
  const [validate, setValidated] = useState(false);
  const [user, setUser] = useState(null);

  firebase.auth().onAuthStateChanged(u => {
    if (u) {
      setUser(u);
    } else {
      setUser(null);
    }
  });

  const LoginButtonPressed = e => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    firebase
      .auth()
      .signInWithEmailAndPassword(email.value, password.value)
      .then(userCredentails => {
        //SignedIn User
        var user = userCredentails.user;
        alert('Login Successful');
        setUser(user);
        setValidated(true);
      })
      .catch(e => {
        alert(e.message);
        setValidated(true);
      });
  };

  const LogoutButtonPressed = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        //Signout Successful
        alert('Logout Successful');
        setUser(null);
        setValidated(false);
      })
      .catch(e => {
        alert(e.message);
      });
  };

  return (
    <>
      {user === null && (
        <div class="div-login-registro">
          <h1>Inicia sesión o regístrate</h1>
          <div class="div-login-registro-contenedor">
            <div class="div-wrapper">
              <div class="div-derecha">
                <p>¿Todavía no estás registrado?</p>
              </div>
              <div class="div-izquierda">
                <p>Si ya estás registrato, inicia sesión.</p>
              </div>
              <input
                id="btn-registro"
                class="btn-registro"
                type="radio"
                name="btn"
              />
              <label for="btn-registro" />

              <input
                id="btn-login"
                class="btn-login"
                type="radio"
                checked
                name="btn"
                noValidate
                validated={validate}
                onSubmit={LoginButtonPressed}
              />
              <label for="btn-login" />

              <form action="" class="form">
                <h2 class="h2-login">Login</h2>
                <h2 class="h2-registro">Registro</h2>
                <label for="fname" class="fname" />
                <input
                  type="text"
                  id="fname"
                  class="fname"
                  placeholder="Nombre"
                />

                <label for="email" class="email" />
                <input
                  type="email"
                  id="email"
                  class="email"
                  placeholder="Email"
                />

                <label for="password" class="password" />
                <input
                  type="password"
                  id="password"
                  class="password"
                  placeholder="Contraseña"
                />
                <input type="checkbox" id="formButton" class="formButton" />
                <label for="formButtom" />
              </form>
            </div>
          </div>
        </div>
      )}
      {user !== null && (
        <div style={{ margin: 24 }}>
          <p>
            You're loggedin successfully. Go to{' '}
            <a href="/dashboard">dashboard</a>
          </p>
          <p>
            <a variant="primary" onClick={LogoutButtonPressed}>
              Click here to Logout
            </a>
          </p>
        </div>
      )}
    </>
  );
}

export default Login;
