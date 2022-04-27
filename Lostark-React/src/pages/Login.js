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
    alert(email.value, password.value);
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
                      targert="email"
                      required
                      placeholder="Email"
                      name="email"
                      id="email"
                    />
                  </div>
                  <div class="input-field">
                    <i class="fas fa-user" />
                    <input
                      targert="password"
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
                  <p class="social-text">
                    O regístrate con plataformas sociales
                  </p>
                  <div class="social-media">
                    <a href="#" class="social-icon">
                      <i class="fab fa-facebook-f" />
                    </a>
                    <a href="#" class="social-icon">
                      <i class="fab fa-twitter" />
                    </a>
                    <a href="#" class="social-icon">
                      <i class="fab fa-google" />
                    </a>
                    <a href="#" class="social-icon">
                      <i class="fab fa-linkedin-in" />
                    </a>
                  </div>
                </form>
                <form action="#" class="sign-up-form">
                  <h2 class="title">Regístrate</h2>
                  <div class="input-field">
                    <i class="fas fa-user" />
                    <input type="text" placeholder="Usuario" />
                  </div>
                  <div class="input-field">
                    <i class="fas fa-envelope" />
                    <input type="email" placeholder="Email" />
                  </div>
                  <div class="input-field">
                    <i class="fas fa-lock" />
                    <input type="password" placeholder="Contraseña" />
                  </div>
                  <input type="submit" class="btn" value="Regístrate" />
                  <p class="social-text">
                    O regístrate con plataformas sociales
                  </p>
                  <div class="social-media">
                    <a href="#" class="social-icon">
                      <i class="fab fa-facebook-f" />
                    </a>
                    <a href="#" class="social-icon">
                      <i class="fab fa-twitter" />
                    </a>
                    <a href="#" class="social-icon">
                      <i class="fab fa-google" />
                    </a>
                    <a href="#" class="social-icon">
                      <i class="fab fa-linkedin-in" />
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
      )}{' '}
      {
        <section>
          <form onSubmit={cerrarSesion}>
            <button type="submit">Cerrar sesión</button>
          </form>
        </section>
      }
    </>
  );
}

export default Login;
