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

  const iniciarSesion = e => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    console.log(e.target.elements);
    firebase
      .auth()
      .signInWithEmailAndPassword(email.value, password.value)
      .then(userCredentails => {
        var user = userCredentails.user;
        alert('Login correcto');
        setUser(user);
        setValidated(true);
      })
      .catch(e => {
        alert(e.message);
        setValidated(true);
      });
  };

  const registrarse = e => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    console.log(e.target.elements);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email.value, password.value)
      .then(userCredentails => {
        var user = userCredentails.user;
        alert('Registro correcto');
        setUser(user);
        setValidated(true);
      })
      .catch(e => {
        alert(e.message);
        setValidated(true);
      });
  };

  const cerrarSesion = () => {
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

  window.onload = function() {
    const sign_in_btn = document.querySelector('#sign-in-btn');
    const sign_up_btn = document.querySelector('#sign-up-btn');
    const container = document.querySelector('.container');

    sign_up_btn.addEventListener('click', () => {
      container.classList.add('sign-up-mode');
    });

    sign_in_btn.addEventListener('click', () => {
      container.classList.remove('sign-up-mode');
    });
  };

  return (
    <>
      {user === null && (
        <section class="section-login-registro">
          <h1>Login / Registro</h1>
          <div class="container">
            <div class="forms-container">
              <div class="signin-signup">
                <form onSubmit={iniciarSesion} class="sign-in-form">
                  <h2 class="title">Iniciar sesión</h2>
                  <div class="input-field">
                    <i class="fas fa-user" />
                    <input
                      type="text"
                      required
                      placeholder="Email"
                      name="email"
                      id="email"
                    />
                  </div>
                  <div class="input-field">
                    <i class="fas fa-user" />
                    <input
                      type="password"
                      placeholder="Contraseña"
                      required
                      name="password"
                      id="password"
                    />
                  </div>
                  <input
                    type="submit"
                    value="Iniciar Sesión"
                    class="btn solid"
                  />
                  <p class="social-text">O regístrate con google</p>
                  <div class="social-media">
                    <a href="#" class="social-icon">
                      <svg
                        role="img"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Google</title>
                        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                      </svg>
                    </a>
                  </div>
                </form>
                <form onSubmit={registrarse} class="sign-up-form">
                  <h2 class="title">Regístrate</h2>
                  <div class="input-field">
                    <i class="fas fa-envelope" />
                    <input type="email" placeholder="Email" id="email" />
                  </div>
                  <div class="input-field">
                    <i class="fas fa-lock" />
                    <input
                      type="password"
                      placeholder="Contraseña"
                      id="password"
                    />
                  </div>
                  <input type="submit" class="btn" value="Regístrate" />
                  <p class="social-text">
                    O regístrate con plataformas sociales
                  </p>
                  <div class="social-media">
                    <a href="#" class="social-icon">
                      <i class="fab fa-google" />
                    </a>
                  </div>
                </form>
              </div>
            </div>

            <div class="panels-container">
              <div class="panel left-panel">
                <div class="content">
                  <h3>¿Eres Nuevo?</h3>
                  <button class="btn transparent" id="sign-up-btn">
                    Regístrate
                  </button>
                </div>
                <img
                  src="https://www.thelordoftheguides.com/lost-ark/wp-content/uploads/sites/5/2021/06/Paladin_PortadaGuerrero_Subclases.png"
                  class="image"
                  alt=""
                />
              </div>
              <div class="panel right-panel">
                <div class="content">
                  <h3>¿Ya tienes una cuenta?</h3>
                  <button class="btn transparent" id="sign-in-btn">
                    Inicia sesión
                  </button>
                </div>
                <img
                  src="https://hthgaming.com/wp-content/uploads/2022/02/lost-ark-fi10.jpg"
                  class="image"
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>
      )}
      {user != null && (
        <section>
          <form onSubmit={cerrarSesion}>
            <button type="submit">Cerrar sesión</button>
          </form>
        </section>
      )}
    </>
  );
}

export default Login;
