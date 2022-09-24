import Button from '@mui/material/Button';

export default function TempRangeClose({ tempRangeData, setTempRangeData }): any {
    return (
        <>
            <div style={{ transform: 'translate(250px, -56px)', position: 'absolute' }}>
                {tempRangeData ? (
                <>
                    <Button onClick={() => setTempRangeData('')} style={{ color: 'white', transform: 'translateY(-7px)' }}>
                        X
                    </Button>
                </>
                ): null}
            </div>
        </>
    );
}
