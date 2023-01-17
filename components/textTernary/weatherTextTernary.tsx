export default function WeatherText({ weatherData }) {
  return (
    <>
      <div
        style={{
          color: 'white',
          fontSize: '15px',
          transform: 'translateY(10px)',
        }}
      >
        {weatherData ? <>Weather</> : null}
      </div>
    </>
  );
}
