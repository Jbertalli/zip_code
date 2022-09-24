import Button from '@mui/material/Button';

export default function WeatherClose({ weatherData, setWeatherData }): any {
    // console.log(stateAbbreviation);
    return (
        <>
            <div style={{ transform: 'translate(250px, -56px)', position: 'absolute' }}>
                {weatherData ? (
                <>
                    <Button onClick={() => setWeatherData('')} style={{ color: 'white', transform: 'translateY(-7px)' }}>
                        X
                    </Button>
                </>
                ): null}
            </div>
        </>
    );
}
