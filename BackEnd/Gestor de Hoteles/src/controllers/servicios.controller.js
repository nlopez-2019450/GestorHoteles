'use strict'

const Hotel = require('../models/hotel.model');
const Servicios = require('../models/servicios.model');

//Crear servicio
const createService = async(req, res) =>{
    if(req.user.rol === 'ADMINAPP'){
        const {name, price, hotelName} = req.body;
            try{
                let servicio = await Servicios.findOne({name})

                if(servicio){
                    return res.status(400).send({
                        message: 'Un servicio ya posee este nombre',
                        ok: false,
                        servicio: servicio,
                    })
                };
        
                //Buscar Hotel por su name y ID
                const hotel = await Hotel.findOne({name: hotelName});
                const hotelId = hotel ? hotel._id : null;
        
                //Crear el servicio y lo asignaremos a un hotel correspondiente
                const service = new Servicios({
                    name,
                    price,
                    hotel: hotelId,
                });

                //Si encontramos el Hotel, agregamos mediante un ID los servicios en el modelo Hotel
                if(hotelId){
                    await Hotel.findByIdAndUpdate(
                        hotelId,
                        {$push: {servicios: service._id}},
                        {new: true, useFindAndModify: false}
                    )
                };
                
                //Guardamos
                await service.save();
        
                return res.status(201).json({
                    message: 'El servicio se ha creado correctamente',
                    ok: true,
                    service: service,
                });
        
            }catch(error){
                console.log(error);
                return res.status(500).json({
                    ok: false,
                    message: 'No se pudo crear el servicio',
                    error: error,
                })
            }
        }else{
            return res.status(401).send({
                message: 'Solo el administrador puede crear servicios'
            })
        }
};

//Listar los servicio
const readService = async(req, res) =>{
    try{
        const services = await Servicios.find();

        if(!services){
            res.status(400).send({message: 'No hay servicios disponibles'});
        }else{
            res.status(200).json({
                'Servicios encontrados': services
            })
        }

    }catch(error){
        console.log(error)
        res.status(500).json({
            message: 'Error al buscar los servicios'
        })
    }
}

//Editar los servicio
const updateService = async(req, res) =>{
    if(req.user.rol === 'ADMINAPP'){
        try{
            const {id} = req.params;
            const serv = await Servicios.findByIdAndUpdate(id, req.body, {new: true});
    
            if(!serv){
                return res.status(404).json({
                    message: 'Servicio inexistente'
                });
            }
    
            res.json(serv);
        }catch(error){
            console.log(error)
            res.status(200).json({
                message: 'Error en el servidor'
            })
        }
    }else{
        return res.status(401).send({
            message: 'Solo el Administrador autorizado puede editar los servicios'
        })
    }
};

//Eliminar servicio
const deleteService = async(req, res) =>{
    if(req.user.rol === 'ADMINAPP'){
        try{
            const serviceId = req.params.id;
            const deleteService = await Servicios.findByIdAndDelete(serviceId);
    
            if(!deleteService){
                return res.status(404).json({
                    message: 'Servicio no encontrado'
                });
            }
    
            const hotelId = deleteService.hotel;
    
            const hotel = await Hotel.findById(hotelId);
    
            if(!hotel){
                return res.status(404).json({
                    message: 'Este servicio no existe en el hotel asignado'
                })
            }
    
            hotel.servicios.pull(serviceId);
            await hotel.save();
    
            return res.status(201).json({message: 'Servicio eliminado correctamente'})
        }catch(error){
            console.log(error);
            res.status(500).json({
                message: 'No se puedo eliminar el servicio'
            })
        }
    }else{
        return res.status(401).send({
            message: 'Solo El administrador autorizado puede eliminar los servicios'
        })
    }
};

module.exports = {  createService,
                    readService,
                    updateService,
                    deleteService}