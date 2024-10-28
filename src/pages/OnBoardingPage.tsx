import OnBoarding1 from '../components/onBoardingContent/OnBoarding1';
import OnBoarding2 from '../components/onBoardingContent/OnBoarding2';
import OnBoarding3 from '../components/onBoardingContent/OnBoarding3';
import OnBoarding4 from '../components/onBoardingContent/OnBoarding4';
import { useRef, useEffect } from 'react';

function OnBoardingPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      event.preventDefault(); // 기본 스크롤 동작 방지

      const deltaY = event.deltaY;

      if (containerRef.current) {
        const children = Array.from(containerRef.current.children);
        const currentIndex = Math.round(containerRef.current.scrollTop / window.innerHeight);
        
        if (deltaY > 0 && currentIndex < children.length - 1) {
          containerRef.current.scrollTo({
            top: (currentIndex + 1) * window.innerHeight,
            behavior: 'smooth',
          });
        } else if (deltaY < 0 && currentIndex > 0) {
          containerRef.current.scrollTo({
            top: (currentIndex - 1) * window.innerHeight,
            behavior: 'smooth',
          });
        }
      }
    };

    window.addEventListener('wheel', handleScroll, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="w-full h-screen overflow-hidden" ref={containerRef}>
      <div className="h-screen flex items-center justify-center"><OnBoarding1 /></div>
      <div className="h-screen flex items-center justify-center"><OnBoarding2 /></div>
      <div className="h-screen flex items-center justify-center"><OnBoarding3 /></div>
      <div className="h-screen flex items-center justify-center"><OnBoarding4 gotoTop={scrollToTop}/></div>
    </div>
  );
}

export default OnBoardingPage;
