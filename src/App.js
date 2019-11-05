import React from 'react';
//import { Component } from 'react';
//import { render } from 'react-dom';
import './App.css';
import 'jquery/src/jquery.js';

//Variables
const $ = window.$;


function App() {
  return (
    <center onLoad={ObtenerDatos()}>
      <div className="card-body col-sm-6 col-md-4 col-lg-3" id="divPrincipal">
        <div className="card" id="divSed">
          <div><h1>Agenda de Victor Rosario</h1></div>
          <form id="Formulario">
            <input type="text" className="form-control" id="txtNombre" placeholder="Ingrese su Nombre"></input>
            <br></br>
            <input type="text" className="form-control" id="txtApellido" placeholder="Ingrese su Apellido"></input>
            <br></br>
            <input type="text" className="form-control" id="txtTel" placeholder="Ingrese su Teléfono"></input>
            <br></br>
            <br></br>            
          </form>
          <button className="btn btn-success" onClick={() => Guardar()} >Guardar</button>
          <button className="btn btn-danger" onClick={() => Clears()} >Borrar</button>
        </div>
      </div>
      <_ListCon/>
    </center>
  );
}

function Clears(){
  document.getElementById('Formulario').reset();
}

function _ListCon(){
  return(
    <center>
      <div className="col-sm-6">
        <div className="span3 name1">
          <h3>Contactos Guardados</h3>
          <div id="ListCon"></div>
        </div>
      </div>
    </center>
  );
}

function ObtenerDatos(){
  let r;

  try{
      fetch('http://www.raydelto.org/agenda.php')
      .then(res => {
          return res.json();
          r = JSON.parse(res);
      })
      .then(function(r){
          $.getJSON("http://www.raydelto.org/agenda.php", ProcesoContactos(r));
          
          function ProcesoContactos(data){
              let contacto;
              
              $.each(data, (contatc, contactInfo) => {
                  contacto += '<p>Contacto: ' + contactInfo.nombre;
                  contacto += ' ' + contactInfo.apellido + '</br>';
                  contacto += 'Teléfono: ' + contactInfo.telefono + '</p>';
              });
              $('#ListCon').html(contacto);
          }
      });
  } catch(error){
      console.error('Hay algunos Errores');
  }
}

function Guardar(){
  debugger;
  try{
    let nombre = document.getElementById('txtNombre').value;
    let apellido = document.getElementById('txtApellido').value;
    let telefono = document.getElementById('txtTel').value;

    if(nombre === undefined || apellido === undefined || telefono === undefined){
      document.getElementById('divPrincipal').innerHTML = 'Hola';
    }
    else{

      let detalles = {
          method: 'POST',
          body: JSON.stringify({
              "nombre": nombre.value,
              "apellido": apellido.value,
              "telefono": telefono.value
          })
      };

      try{
          fetch('http://www.raydelto.org/agenda.php',detalles)
          .then(function(res) {
              return res.json();
          })
          .then(function(res) {
              if(res.exito === true){
                  console.log("Exito");

                  //localStorage.setItem('data', JSON.parse(res));

                  ObtenerDatos();
              }
              else{
                  document.getElementById('divPrincipal').innerHTML = '<h1>Hubo un Problema</h1>';
                  ObtenerDatos();
              }
          });
      }catch(error){
          console.log('Hay error');
      }
    }
  }catch(error){
    console.error(error);
  }
}


export default App;