import Button from '@mui/material/Button';

export default function LongClose({ longCoord, setLongCoord }): any {
  return (
    <>
      <div
        style={{ transform: 'translate(250px, -56px)', position: 'absolute' }}
      >
        {longCoord ? (
          <>
            <Button
              onClick={() => setLongCoord('')}
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
