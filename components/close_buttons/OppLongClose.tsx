import Button from '@mui/material/Button';

export default function OppLongClose({ OppLong, setOppLong }): any {
    // console.log(OppLong);
    return (
        <>
            <div style={{ transform: 'translate(250px, -56px)', position: 'absolute' }}>
                {OppLong ? (
                <>
                    <Button onClick={() => setOppLong('')} style={{ color: 'white' }}>
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