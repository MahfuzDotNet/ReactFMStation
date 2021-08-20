import { Form, Button, OverlayTrigger, Tooltip, InputGroup } from "react-bootstrap";
import StationProvider, { StationContext } from './StationContext';
import React, { useContext, useEffect, useState } from 'react';
import IStation from '../interfaces/Station';
import '../css/styles.css';
import imageBackArrow from '../css/assets/back-arrow.png';
import imageEllipse from '../css/assets/switch.png';

const AddStation = () => {

  let station = {} as IStation;
  const { addNewStation } = useContext(StationContext);
  const [newStation, setNewStation] = useState(station);
  const [addStation, setAddStation] = useState(Boolean);

  const onInputChange = (e: any) => {
    setNewStation({ ...newStation, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('station-- ' + JSON.stringify(station));
    if (addNewStation(newStation)) {
      setAddStation(true);
      setNewStation({
        id: "",
        stationName: "",
        stationBand: ""
      });

    }
    else {
      setAddStation(false);
      setNewStation({
        id: "",
        stationName: "",
        stationBand: ""
      });
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setAddStation(false);
    }, 8000);
  });

  return (
    <>
      <div className="card">
        <div className="card-header">
          <span className="arrow-left">
            <img src={imageBackArrow} width="40px" height="48px" />
          </span>
          <span className="stations-text">
            STATIONS
          </span>
          <span className="ellipse">
            <img src={imageEllipse} width="40px" height="48px" />
          </span>
        </div>

        <div className="putin-fm">
          <div className="success">{addStation &&
            <h2>
              Station added successfully!
            </h2>
          }</div>
          <Form onSubmit={handleSubmit}>
            <Form.Row>
              <Form.Group controlId="formGridStationName">
                <Form.Label className="label-station">Station Name</Form.Label>
                <Form.Control className="input-station" type="text" name="stationName" value={newStation.stationName} placeholder="Enter Station Name"
                  onChange={(e) => onInputChange(e)} />
              </Form.Group>
              <div className="gap" > </div>
              <Form.Group controlId="formGridStationBand">
                <Form.Label className="label-station" >Station Band</Form.Label>
                <Form.Control className="input-band" type="text" name="stationBand" value={newStation.stationBand} placeholder="Enter Station Band"
                  onChange={(e) => onInputChange(e)} />
              </Form.Group>
            </Form.Row>

            <Button variant="success" className="button-add" type="submit" block>
              Add New station
            </Button>
          </Form>
        </div>
      </div>

    </>

  )
}

export default () => (
  <StationProvider>
    <AddStation />
  </StationProvider>
);




