export default function StateText({ state }) {
  return (
    <>
      <div
        style={{
          color: 'white',
          fontSize: '15px',
          transform: 'translateY(10px)',
        }}
      >
        {state ? <>State</> : null}
      </div>
    </>
  );
}
