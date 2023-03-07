import Button from '@mui/material/Button';

export default function OppLongClose({ OppLong, setOppLong }): any {
  return (
    <>
      <div
        style={{ transform: 'translate(250px, -56px)', position: 'absolute' }}
      >
        {OppLong ? (
          <>
            <Button
              onClick={() => setOppLong('')}
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
