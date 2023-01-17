export default function OppositeLongitudeText({ OppLong }) {
  return (
    <>
      <div
        style={{
          color: 'white',
          fontSize: '15px',
          transform: 'translateY(10px)',
        }}
      >
        {OppLong ? <>Opposite Longitude</> : null}
      </div>
    </>
  );
}
