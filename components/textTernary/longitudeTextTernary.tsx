export default function LongitudeText({ longCoord }) {
  return (
    <>
      <div
        style={{
          color: 'white',
          fontSize: '15px',
          transform: 'translateY(10px)',
        }}
      >
        {longCoord ? <>Longitude</> : null}
      </div>
    </>
  );
}
