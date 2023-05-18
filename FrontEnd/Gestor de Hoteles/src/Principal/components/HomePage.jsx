import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import '../styles/Principal.css'
export const HomePage = () =>{

    const logout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
      };
    return (        
        <>
       <header>
        <h1>Hotel</h1>
        <div className='container-icon'>
            <AccountCircleIcon sx={{ fontSize: 100 }} className='iconito' />
            <div className='account'>
                <ul className='nab'>
                <li><a href="">My account</a>
                <ul>
                    <li><a href="">Admin App</a></li>
                    <li><a href="">Admin Hotel</a></li>
                    <li><a href="">Reservaciones</a></li>
                    <li><a onClick={ logout } href="">logout</a></li>
                </ul>
                </li>
                </ul>
            </div>
            
        </div>
        </header>
        <div className='container-items'>
            <div className='item'>
                <figure>
                    <img src="https://www.intermundial.es/blog/wp-content/uploads/2011/09/problemas-hotel.jpg" alt="Imagen de hotel" />
                </figure>
                <div className='info-product'>
                    <h2>Habitacion</h2>
                    <p className='price'>$100</p>
                    <button>Reservar</button>
                </div>
            </div>
        
            <div className='item'>
                <figure>
                    <img src="https://www.intermundial.es/blog/wp-content/uploads/2011/09/problemas-hotel.jpg" alt="Imagen de hotel" />
                </figure>
                <div className='info-product'>
                    <h2>Habitacion</h2>
                    <p className='price'>$100</p>
                    <button>Reservar</button>
                </div>
            </div>
        
            <div className='item'>
                <figure>
                    <img src="https://www.intermundial.es/blog/wp-content/uploads/2011/09/problemas-hotel.jpg" alt="Imagen de hotel" />
                </figure>
                <div className='info-product'>
                    <h2>Habitacion</h2>
                    <p className='price'>$100</p>
                    <button>Reservar</button>
                </div>
            </div>
        
            <div className='item'>
                <figure>
                    <img src="https://www.intermundial.es/blog/wp-content/uploads/2011/09/problemas-hotel.jpg" alt="Imagen de hotel" />
                </figure>
                <div className='info-product'>
                    <h2>Habitacion</h2>
                    <p className='price'>$100</p>
                    <button>Reservar</button>
                </div>
            </div>
            </div>
        </>
    )
}