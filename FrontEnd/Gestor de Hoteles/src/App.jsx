import React from 'react';
import { userAuthenticated } from "./login/helpers/loginHelper"
import { Login } from "./login/components/Login"
import { Navigate, Route, Routes } from "react-router-dom"
import { HomePage } from "./Principal/components/HomePage"
import { RegisterCard } from './login/components/Register';

export const App = () =>{
  return(
    <>
    <Routes>
      <Route path="/"
      element={userAuthenticated() ? (<HomePage></HomePage>) : ( <Navigate to="/login"></Navigate> ) }
      ></Route>
      <Route
      path="/login"
      element={!userAuthenticated() ? (<Login></Login>) : (<Navigate to="/"></Navigate>)
      }
    ></Route>
    <Route
    path="/create-user"
    element={<RegisterCard></RegisterCard>}
        ></Route>

    </Routes>
  </>
  )
}