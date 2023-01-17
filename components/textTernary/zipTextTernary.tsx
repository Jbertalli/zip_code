export default function ZipText({ zip }) {
  return (
    <>
      <div
        style={{
          color: 'white',
          fontSize: '15px',
          transform: 'translateY(10px)',
        }}
      >
        {zip ? <>Zip Code</> : null}
      </div>
    </>
  );
}
