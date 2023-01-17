export default function OppositeLatitudeText({ OppLat }) {
  return (
    <>
      <div
        style={{
          color: 'white',
          fontSize: '15px',
          transform: 'translateY(10px)',
        }}
      >
        {OppLat ? <>Opposite Latitude</> : null}
      </div>
    </>
  );
}
