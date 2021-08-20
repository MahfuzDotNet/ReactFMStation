const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { uuid } = require('uuidv4');

const app = express();

app.use(express.json());
app.use(cors());


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`app started on port ${PORT}`)
});

app.get("/", (req, res) =>{
    res.send("hello world!");
});

const iStation = {
    id: "",
    stationName: "",
    stationBand: "",
}

app.get('/stations', async (req, res, _next) => {

    console.log("hey there! ");

    try {
        const stations = [];
        const path = 'stations.json';

        await fs.readFile(path, function (_err, data) {

            if (fs.statSync(path).size !== 0) {
                let jsonData = JSON.parse(data);
  
                for (let item of jsonData) {
                    const station = Object.create(iStation);
                    console.log("jsonData " + jsonData);
                    station.id = item.id;
                    station.stationName = item.stationName;
                    station.stationBand = item.stationBand;                  

                    stations.push(station);
                }
            }

            console.log("stations " + JSON.stringify(stations));
            return res.send(stations);

        })


    } catch (err) {
        throw new Error(`Could not write file because of {err}`);
    }
});


app.use('/createstation', async (req, res, _next) => {

    try {  
        console.log("req.body)--- "+  JSON.stringify(req.body));
        await writeToFileAsync(req.body);
        return res.status(200).send({ message: 'File written successfully!' });

    } catch (err) {
        throw new Error(`Could not write file because of {err}`);
    }
});

var writeToFileAsync = (contentToWrite) => {
    try {

        console.log("contentToWrite)--- "+ contentToWrite);

        let items = [];
        const newStation = Object.create(iStation);

        const path = "stations.json";
        let content = JSON.stringify(contentToWrite);         
        console.log("content----- "+  content);

        newStation.id = uuid(); 
        newStation.stationName = JSON.parse(content).stationName; 
        newStation.stationBand = JSON.parse(content).stationBand;    

        fs.readFile(path, function (_err, data) {

            if (fs.statSync(path).size !== 0) {
                let jsonData = JSON.parse(data);

                for (let item of jsonData) {
                    const station = Object.create(iStation);

                    station.id = item.id;
                    station.stationName = item.stationName;
                    station.stationBand = item.stationBand;

                    items.push(station);
                }
            }

            items.push(newStation);

            fs.writeFileSync(path, JSON.stringify(items));

        })

    } catch (err) {
        throw new Error(`Could not write file because of {err}`);
    }
}

