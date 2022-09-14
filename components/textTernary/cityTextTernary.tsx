export default function CityText({ city }) {
    return (
        <>
            <div style={{ color: 'white', fontSize: '15px', transform: 'translateY(10px)' }}>
                {(city) ? (
                <>
                    City
                </>
                ): null}
            </div>
        </>
    );
}
