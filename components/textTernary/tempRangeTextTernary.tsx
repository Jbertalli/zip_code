export default function TempRangeText({ tempRangeData }) {
    return (
        <>
            <div style={{ color: 'white', fontSize: '15px', transform: 'translateY(10px)' }}>
                {(tempRangeData) ? (
                <>
                    Temperature Range
                </>
                ): null}
            </div>
        </>
    );
}
