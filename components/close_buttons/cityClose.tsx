import Button from '@mui/material/Button';

export default function CityClose({ city, setCity }): any {
    // console.log(city);
    return (
        <>
            <div style={{ transform: 'translate(250px, -56px)', position: 'absolute' }}>
                {city ? (
                <>
                    <Button onClick={() => setCity('')} style={{ color: 'white', transform: 'translateY(-7px)' }}>
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
