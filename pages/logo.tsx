import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';

export default function Logo() {
  return (
    <>
      <div
        style={{
          width: '100vw',
          height: '150vh',
          background: 'white',
          position: 'absolute',
          zIndex: '-1',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: '200px',
          height: '200px',
          background: '#125CA1',
          borderRadius: '50%',
          color: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transform: 'translate(45vw, 40vh) scale(2.5)',
        }}
      >
        <div
          style={{ transform: 'scale(12.0) rotate(45deg) translateY(-2px)' }}
        >
          <AirplanemodeActiveIcon
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
        </div>
      </div>
    </>
  );
}
