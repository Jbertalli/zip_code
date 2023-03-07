import Button from '@mui/material/Button';

export default function LatClose({ latCoord, setLatCoord }): any {
  return (
    <>
      <div
        style={{ transform: 'translate(250px, -56px)', position: 'absolute' }}
      >
        {latCoord ? (
          <>
            <Button
              onClick={() => setLatCoord('')}
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
