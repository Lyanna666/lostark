import React from 'react';

function NoLogin(props) {
  return (
    <>
      <div class="div-no-login">
        <h1>🚫 ERROR 🚫</h1>
        <p>Para poder acceder a la aplicación es necesario estar registrado.</p>
        <p>Por favor, inicia sesión o regístrate.</p>
        <a href="/Login">Ir al login ➤</a>
      </div>
    </>
  );
}

export default NoLogin;
