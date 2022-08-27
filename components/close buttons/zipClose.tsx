import Button from '@mui/material/Button';

export default function zipClose({ zip, setZip }) {
    // console.log(zip);
    return (
        <>
             {zip ? (
              <>
                <Button onClick={() => setZip('')} variant="container" style={{ color: 'red' }}>
                    X
                </Button>
              </>
              ):(
              <>
              </>
              )}
        </>
    );
}
