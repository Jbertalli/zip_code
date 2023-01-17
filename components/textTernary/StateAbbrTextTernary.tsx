export default function StateAbbreviationText({ stateAbbreviation }) {
  return (
    <>
      <div
        style={{
          color: 'white',
          fontSize: '15px',
          transform: 'translateY(10px)',
        }}
      >
        {stateAbbreviation ? <>State Abbreviation</> : null}
      </div>
    </>
  );
}
