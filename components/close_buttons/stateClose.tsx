import Button from '@mui/material/Button';

export default function StateClose({ state, setState }) {
    // console.log(state);
    return (
        <>
            <div style={{ transform: 'translate(250px, -56px)', position: 'absolute' }}>
                {state ? (
                <>
                    <Button onClick={() => setState('')} style={{ color: 'red' }}>
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
