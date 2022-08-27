import Button from '@mui/material/Button';

export default function CityClose({ city, setCity }) {
    // console.log(city);
    return (
        <>
            <div style={{ transform: 'translate(250px, -56px)', position: 'absolute' }}>
                {city ? (
                <>
                    <Button onClick={() => setCity('')} variant="container" style={{ color: 'red' }}>
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
