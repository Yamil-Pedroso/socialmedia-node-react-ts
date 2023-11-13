import  { useState, useEffect } from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const ScrollUpArrow = () => {
  const [showArrow, setShowArrow] = useState(false);

  const smoothScrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleScroll = () => {
    if (window.scrollY > 100 && !showArrow) {
      setShowArrow(true);
    } else if (window.scrollY <= 100 && showArrow) {
      setShowArrow(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll, showArrow]); 

  return (
    <div
      onClick={smoothScrollUp}
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 10,
        cursor: 'pointer',
        display: showArrow ? 'block' : 'none',
        transition: 'transform 0.2s',
      }}
      onMouseOver={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')}
      onMouseOut={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
    >
      <ArrowUpwardIcon sx={{ fontSize: '1.5rem' }} />
    </div>
  );
};

export default ScrollUpArrow;
