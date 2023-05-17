import React, { useState } from "react";
import { login } from "../api/ApiLogin";
import Swal from "sweetalert2";
import "../styles/login.css"

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

        const SignIn = async(e) =>{
          e.preventDefault();
          const result = await login(email, password)
          if (result) {
            Swal.fire({
              icon: "success",
              title: "Por fin",
              text: "Has iniciado sesion correctamente",
              confirmButtonText: "Ok"
            }).then((r) => {
              if (r.isConfirmed) {
                window.location.href = "/";
              }else{
                window.location.href = "/";
              }

            })
          }
        }

  return (
    <>
    <div className="container">
      <div className="card"> 
      <form>
      <h2 class="card-title">Iniciar Sesión</h2>
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
      </div>
      </div>
    </>
  )
}