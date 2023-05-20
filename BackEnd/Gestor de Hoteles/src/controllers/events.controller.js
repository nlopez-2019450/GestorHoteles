'use strict'

const Events = require('../models/events.model');
const Hotel = require('../models/hotel.model');

const createEvents = async(req, res) =>{
    if(req.user.rol === 'ADMINAPP'){
        const {event, eventType, hotelName, date} = req.body;
            try{
                let eventx = await Events.findOne({event});
                
                if(eventx){
                    return res.status(400).send({
                        message: 'Un evento ya posee este nombre',
                        ok: false,
                        event: eventx
                    })
                };

                //Buscamos el hotel por su name y ID
                const hotel = await Hotel.findOne({name: hotelName});
                const hotelId = hotel ? hotel._id : null;

                //Crear el vento y lo asignaremos al hotel correspondiente
                const events = new Events({
                    event,
                    eventType,
                    hotel: hotelId,
                    date,
                });

                //Si encontramos el hotel, agregamos mediante un ID los eventos en el modelo hotel
                if(hotelId){
                    await Hotel.findByIdAndUpdate(
                        hotelId,
                        {$push: {events: events._id}},
                        {new: true, useFindAndModify: false}
                    )
                };

                //Guardamos
                await events.save();

                return res.status(201).json({
                    message: 'Evento creado correctamente',
                    ok: true,
                    event: event,
                    eventType: eventType,
                    hotelId: hotelId
                });

            }catch(error){
                console.log(error)
                return res.status(500).send({
                    ok: false,
                    message: 'No se puedo crear el eventeo',
                    error: error,
                });
            }
        }else{
            return res.status(201).send({
                message: 'Sólo el administrador autorizado puede crear eventos'
            })
        }
}

module.exports = {createEvents}