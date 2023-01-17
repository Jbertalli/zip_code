export default function CurrentTempText({ currentTempData }) {
  return (
    <>
      <div
        style={{
          color: 'white',
          fontSize: '15px',
          transform: 'translateY(10px)',
        }}
      >
        {currentTempData ? <>Current Temperature</> : null}
      </div>
    </>
  );
}
