import Button from '@mui/material/Button';

export default function StateClose({ state, setState }) {
  return (
    <>
      <div
        style={{ transform: 'translate(250px, -56px)', position: 'absolute' }}
      >
        {state ? (
          <>
            <Button
              onClick={() => setState('')}
              style={{ color: 'white', transform: 'translateY(-7px)' }}
            >
              X
            </Button>
          </>
        ) : null}
      </div>
    </>
  );
}
