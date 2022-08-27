import Button from '@mui/material/Button';

export default function AbbrClose({ stateAbbreviation, setStateAbbreviation }) {
    // console.log(stateAbbreviation);
    return (
        <>
            <div style={{ transform: 'translate(250px, -56px)', position: 'absolute' }}>
                {stateAbbreviation ? (
                <>
                    <Button onClick={() => setStateAbbreviation('')} variant="container" style={{ color: 'red' }}>
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
