import Button from '@mui/material/Button';

export default function CurrentTempClose({
  currentTempData,
  setCurrentTempData,
}): any {
  return (
    <>
      <div
        style={{ transform: 'translate(250px, -56px)', position: 'absolute' }}
      >
        {currentTempData ? (
          <>
            <Button
              onClick={() => setCurrentTempData('')}
              style={{ color: 'white', transform: 'translateY(-7px)' }}
            >
              X
            </Button>
          </>
        ) : null}
      </div>
    </>
  );
}
