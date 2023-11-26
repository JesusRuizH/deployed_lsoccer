const {google} = require('googleapis');
require('dotenv').config();

// Provide the required configuration
const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);
const calendarId = process.env.CALENDAR_ID;

// Google calendar API settings
const SCOPES = 'https://www.googleapis.com/auth/calendar';
const calendar = google.calendar('v3');

const auth = new google.auth.JWT(
    CREDENTIALS.client_email,
    null,
    CREDENTIALS.private_key,
    SCOPES
);
  
// Your TIMEOFFSET Offset
const TIMEOFFSET = '-06:00';

export default async function handler(req, res){

    switch(req.method){
        //si la llamada a la pagina es GET va a listar todos los productos
        case 'POST': 
            return await eventos(req, res);
        //si ees POST va a guardar el producto
    }
    
}

function eventos(req, res){
    const {FK_categoria, descripcion_evento, fecha_evento,ubicacion_evento, hora_ini, hora_fin, nombre_eve} = req.body
    console.log(FK_categoria, descripcion_evento, fecha_evento,ubicacion_evento, hora_ini, hora_fin)
    const insertEvent = async (event) => {

        try {
            let response = await calendar.events.insert({
                auth: auth,
                calendarId: calendarId,
                resource: event
            });
        
            if (response['status'] == 200 && response['statusText'] === 'OK') {
                return 1;
            } else {
                return 0;
            }
        } catch (error) {
            console.log(`Error at insertEvent --> ${error}`);
            return 0;
        }
    };

    let event = {
        'summary': `${nombre_eve}`,
        'description': `${descripcion_evento}`,
            'start': {
                'dateTime': `${fecha_evento}T${hora_ini}:00:00.000${TIMEOFFSET}`,
                'timeZone': 'America/Mexico_City'
            },
            'end': {
                'dateTime': `${fecha_evento}T${hora_fin}:00:00.000${TIMEOFFSET}`,
                'timeZone': 'America/Mexico_City'
            }
    };

    /**
     * 
     */

    insertEvent(event)
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });

    try {    
        console.log(FK_categoria, descripcion_evento, fecha_evento,ubicacion_evento)
        return res.status(200).json({FK_categoria, descripcion_evento, fecha_evento,ubicacion_evento})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
    

/*

// Get date-time string for calender
const dateTimeForCalander = () => {

    let date = new Date();

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`;
    }
    let day = date.getDate();
    if (day < 10) {
        day = `0${day}`;
    }
    let hour = date.getHours();

    let minute = date.getMinutes();

    let newDateTime = `${year}-${month}-${day}T${hour}:${minute}:00.000${TIMEOFFSET}`;

    let event = new Date(Date.parse(newDateTime));

    let startDate = event;
    // Delay in end time is 1
    let endDate = new Date(new Date(startDate).setHours(startDate.getHours()+1));

    console.log(event)

    return {
        'start': startDate,
        'end': endDate
    }
};


// Insert new event to Google Calendar
const insertEvent = async (event) => {

    try {
        let response = await calendar.events.insert({
            auth: auth,
            calendarId: calendarId,
            resource: event
        });
    
        if (response['status'] == 200 && response['statusText'] === 'OK') {
            return 1;
        } else {
            return 0;
        }
    } catch (error) {
        console.log(`Error at insertEvent --> ${error}`);
        return 0;
    }
};

let dateTime = dateTimeForCalander();

// // Event for Google Calendar
let event = {
    'summary': `This is the summary.`,
    'description': `This is the description.`,
        'start': {
            'dateTime': dateTime['start'],
            'timeZone': 'Asia/Kolkata'
        },
        'end': {
            'dateTime': dateTime['end'],
            'timeZone': 'Asia/Kolkata'
    }
};

*/
/*
insertEvent(event)
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });
*/

// Get all the events between two dates
const getEvents = async (dateTimeStart, dateTimeEnd) => {

    try {
        let response = await calendar.events.list({
            auth: auth,
            calendarId: calendarId,
            timeMin: dateTimeStart,
            timeMax: dateTimeEnd,
            timeZone: 'Asia/Kolkata'
        });
    
        let items = response['data']['items'];
        return items;
    } catch (error) {
        console.log(`Error at getEvents --> ${error}`);
        return 0;
    }
};

// let start = '2020-10-03T00:00:00.000Z';
// let end = '2020-10-04T00:00:00.000Z';

// getEvents(start, end)
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err);
//     });

// Delete an event from eventID
const deleteEvent = async (eventId) => {

    try {
        let response = await calendar.events.delete({
            auth: auth,
            calendarId: calendarId,
            eventId: eventId
        });

        if (response.data === '') {
            return 1;
        } else {
            return 0;
        }
    } catch (error) {
        console.log(`Error at deleteEvent --> ${error}`);
        return 0;
    }
};

let eventId = 'hkkdmeseuhhpagc862rfg6nvq4';
    /*
deleteEvent(eventId)
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });
    */