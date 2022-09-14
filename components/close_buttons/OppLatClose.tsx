import Button from '@mui/material/Button';

export default function OppLatClose({ OppLat, setOppLat }): any {
    // console.log(OppLat);
    return (
        <>
            <div style={{ transform: 'translate(250px, -56px)', position: 'absolute' }}>
                {OppLat ? (
                <>
                    <Button onClick={() => setOppLat('')} style={{ color: 'white', transform: 'translateY(-7px)' }}>
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
