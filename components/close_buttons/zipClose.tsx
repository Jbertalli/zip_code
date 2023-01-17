import Button from '@mui/material/Button';

export default function ZipClose({ zip, setZip }): any {
  // console.log(zip);
  return (
    <>
      <div
        style={{ transform: 'translate(250px, -56px)', position: 'absolute' }}
      >
        {zip ? (
          <>
            <Button
              onClick={() => setZip('')}
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
