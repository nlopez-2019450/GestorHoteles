import React, { useState } from "react";
import { login } from "../api/ApiLogin";
import Swal from "sweetalert2";
import "../styles/login.css"
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom'

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

        const SignIn = async(e) =>{
          e.preventDefault();
          const user = await login(email, password)
          if (user) {
            Swal.fire({
              icon: "success",
              title: "Por fin",
              text: "Has iniciado sesion correctamente",
              confirmButtonText: "Ok"
            }).then((r) => {
              if (r.isConfirmed) {
                return window.location.href="/"; 
              }else{
                return window.location.href="/";
              }

            })
          }
        }

  return (
    <>
    <div className="container">
      <div className="card"> 
      <form>
      <h2 className="card-title">Iniciar Sesión</h2>
        <div className="form-group">
          <label className="label">Correo Electrónico</label>
          <input
            value={email}
            onChange={({ target: { value } }) => setEmail(value)}
            type="email"
            className="input"
            id="email"
            required
          />
        </div>
        <div className="form-group">
          <label className="label">Contraseña</label>
          <input
            value={password}
            onChange={({ target: { value } }) => setPassword(value)}
            type="password"
            className="input"
            id="password"
            required
          />
        </div>
        <button
          type="submit"
          onClick={(e) => SignIn(e)}
          className="button"
        >
          Iniciar Sesión
        </button>
      </form>
      <p>
          ¿No tienes una cuenta?{' '}
          <Link to="/create-user" className="register-link">
            Regístrate aquí
          </Link>
        </p>
      </div>
      </div>
    </>
  )
}