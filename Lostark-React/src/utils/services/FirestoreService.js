import { db } from '../firestore';

// Clases *****************
function getSubclases() {
  return new Promise((resolve, reject) => {
    db.collection('subclases')
      .orderBy('clase')
      .get()
      .then(subclases => {
        resolve(subclases);
      })
      .catch(e => {
        reject(e);
      });
  });
}

function getAllMenuCategories() {
  return new Promise((resolve, reject) => {
    db.collection('clases')
      .get()
      .then(allMenuCategories => {
        resolve(allMenuCategories);
      })
      .catch(e => {
        reject(e);
      });
  });
}

function AddNewMenuItem(itemName, itemCategory, itemPrice) {
  return new Promise((resolve, reject) => {
    const data = {
      itemName: itemName,
      itemCategory: itemCategory,
      itemPrice: parseFloat(itemPrice),
    };

    db.collection('MenuItems')
      .add(data)
      .then(docRef => {
        resolve(docRef);
      })
      .catch(e => {
        reject(e);
      });
  });
}

function UpateMenuItem(menuItemID, itemName, itemCategory, itemPrice) {
  return new Promise((resolve, reject) => {
    const data = {
      itemName: itemName,
      itemCategory: itemCategory,
      itemPrice: parseFloat(itemPrice),
    };

    db.collection('clases')
      .doc(menuItemID)
      .update(data)
      .then(() => {
        resolve();
      })
      .catch(e => {
        reject(e);
      });
  });
}

function DeleteMenuItem(menuItemID) {
  return new Promise((resolve, reject) => {
    db.collection('MenuItems')
      .doc(menuItemID)
      .delete()
      .then(() => {
        resolve();
      })
      .catch(e => {
        reject(e);
      });
  });
}

// Personajes *****************
function getPersonajes(usuario) {
  return new Promise((resolve, reject) => {
    console.log(usuario);
    db.collection('personajes')
      .orderBy('nombre')
      .where('usuario', '==', usuario)
      .get()
      .then(personajes => {
        resolve(personajes);
        console.log('Respuesta user:', personajes);
      })
      .catch(e => {
        reject(e);
        console.log('Respuesta user:', e);
      });
  });

  // return new Promise((resolve, reject) => {
  //   db.collection('personajes')
  //     .get()
  //     .then(personajes => {
  //       const tempDoc = [];
  //       personajes.docs.map(doc => {
  //         tempDoc.push({ id: doc.id, ...doc.data() });
  //       });
  //       console.log('Promise db:', tempDoc, '-', personajes);
  //       resolve(tempDoc);
  //     })
  //     .catch(e => {
  //       reject(e);
  //     });
  // });

  // const events = await firebase.firestore().collection('personajes');
  // events.get().then(querySnapshot => {
  //   const tempDoc = [];
  //   querySnapshot.forEach(doc => {
  //     tempDoc.push({ id: doc.id, ...doc.data() });
  //   });
  //   console.log('base de dato:', tempDoc);
  // });
}

function addPersonaje(nombre, clase, icono, usuario) {
  return new Promise((resolve, reject) => {
    const data = {
      nombre: nombre,
      clase: clase,
      icono: icono,
      usuario: usuario,
    };
    console.log(data);
    db.collection('personajes')
      .add(data)
      .then(docRef => {
        resolve(docRef);
      })
      .catch(e => {
        reject(e);
      });
  });
}

function deletePersonaje(personajeId) {
  return new Promise((resolve, reject) => {
    db.collection('personajes')
      .doc(personajeId)
      .delete()
      .then(() => {
        resolve();
      })
      .catch(e => {
        reject(e);
      });
  });
}

// Calendarios *****************
function getCalendarios() {
  return new Promise((resolve, reject) => {
    db.collection('calendarios')
      .get()
      .then(calendarios => {
        resolve(calendarios);
        console.log('Respuesta calendarios:', calendarios);
      })
      .catch(e => {
        reject(e);
        console.log('Error calendarios:', e);
      });
  });
}

export default {
  getSubclases,
  getAllMenuCategories,
  AddNewMenuItem,
  UpateMenuItem,
  DeleteMenuItem,
  getPersonajes,
  addPersonaje,
  deletePersonaje,
  getCalendarios,
};
