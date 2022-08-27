import Button from '@mui/material/Button';

export default function LatClose({ latCoord, setLatCoord }) {
    // console.log(latCoord);
    return (
        <>
            <div style={{ transform: 'translate(250px, -56px)', position: 'absolute' }}>
                {latCoord ? (
                <>
                    <Button onClick={() => setLatCoord('')} variant="container" style={{ color: 'red' }}>
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
