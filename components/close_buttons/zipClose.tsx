import Button from '@mui/material/Button';

export default function ZipClose({ zip, setZip }) {
    // console.log(zip);
    return (
        <>
            <div style={{ transform: 'translate(100px, -56px)', position: 'absolute' }}>
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
            </div>
        </>
    );
}
