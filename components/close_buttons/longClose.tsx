import Button from '@mui/material/Button';

export default function LongClose({ longCoord, setLongCoord }): any {
    // console.log(longCoord);
    return (
        <>
            <div style={{ transform: 'translate(250px, -56px)', position: 'absolute' }}>
                {longCoord ? (
                <>
                    <Button onClick={() => setLongCoord('')} style={{ color: 'red' }}>
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
