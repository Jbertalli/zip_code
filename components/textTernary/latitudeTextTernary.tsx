export default function LatitudeText({ latCoord }) {
    return (
        <>
            <div style={{ color: 'white', fontSize: '15px', transform: 'translateY(10px)' }}>
                {(latCoord) ? (
                <>
                    Latitude
                </>
                ): null}
            </div>
        </>
    );
}
