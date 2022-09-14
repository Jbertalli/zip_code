import Button from '@mui/material/Button';

export default function AbbrClose({ stateAbbreviation, setStateAbbreviation }): any {
    // console.log(stateAbbreviation);
    return (
        <>
            <div style={{ transform: 'translate(250px, -56px)', position: 'absolute' }}>
                {stateAbbreviation ? (
                <>
                    <Button onClick={() => setStateAbbreviation('')} style={{ color: 'white', transform: 'translateY(-7px)' }}>
                        X
                    </Button>
                </>
                ): null}
            </div>
        </>
    );
}
