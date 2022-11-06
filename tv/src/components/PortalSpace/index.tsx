import { ReactNode, ButtonHTMLAttributes } from 'react'
import ReactWeather, { useOpenWeather } from 'react-open-weather';
import { Map, Marker } from "pigeon-maps"



import { Container } from './styles'

const data = {
      forecast: [
          {
            date: 'Fri 27 November',
            description: 'Clear',
            icon:'SVG PATH',
            temperature: { min: '-0', max: '6' },
            wind: '2',
            humidity: 60,
          },
          {
            date: 'Sat 28 November',
            description: 'Clouds',
            icon:'SVG PATH',
            temperature: { min: '-1', max: '6' },
            wind: '3',
            humidity: 67,
          },
      ],
      current: {
          description: 'Clear',
          icon:'SVG PATH',
          temperature: { current: '54', min: 48, max: 60 },
          wind: '2',
          humidity: 90,
        },
    };

const position = [51.505, -0.09]


export const PortalSpace = () => {
  return (
    <Container style={{padding: '5vw'}}>
      <div>
        <h1 style={{fontSize: '3vw', marginBottom: '1vh'}}>Good Morning,</h1>
        <div style={{ backgroundColor: "#FFF2F2", width: '40vw', height: 'fit-content', borderRadius: 20, padding: '1vw'}}>
          <h1 style={{fontSize: '2vw', marginBottom: '1vh'}}>08:30AM</h1>
          <h1 style={{fontSize: '2vw', marginBottom: '1vh'}}>November 5th, 2022</h1>
        </div>
        <div style={{display: 'flex', flexDirection: "row"}}>
        <div
            style={{ backgroundColor: "#248DBC", width: '40vw', height: '27vh', borderRadius: 20, marginTop: '1vh'}}
        >
          <ReactWeather
            isLoading={false}
            data={data}
            lang="en"
            locationLabel="Jersey City, NJ"
            unitsLabels={{ temperature: 'F', windSpeed: 'm/h' }}
            showForecast={false}
           theme={{boxShadow : '', borderRadius: 20}}
          />
        </div>
        </div>
        <div
          style={{height: '35vh',borderRadius: 20, marginTop: '1vh', width: '40vw' }}
        >
        <Map defaultCenter={[50.879, 4.6997]} defaultZoom={11} >
      <Marker width={50} anchor={[50.879, 4.6997]} />
    </Map>

  </div>
      </div>
      <div style={{position: 'absolute', left: '50vw', top: 0, height: '100vh', overflowY: 'scroll',  overflowX: 'hidden', width: '50vw'}}>
        {[50, 30, 10, 20, 60, 10, 45, 10,20,40,30].map((value, indx) => {
          return (
            <div key={indx} style={{ paddingRight: '2vw', backgroundColor: "#FFF2F2", width: '48vw', height: `${value}vh`, marginBottom: '4vh', borderRadius: 20, padding: '1vw'}}>
              <h1 style={{fontSize: '2vw', marginBottom: '1vh'}}></h1>
            </div>
          )
        })}
      </div>

    </Container>
  )
}

