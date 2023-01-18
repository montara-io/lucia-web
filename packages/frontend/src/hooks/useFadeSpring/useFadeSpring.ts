import { useSpring, config } from 'react-spring';

/** Gets title as page name and update the title of the document with its translation **/
const useFadeSpring = (show: boolean, duration = 200): any => {
  const fadeStyles = useSpring({
    config: { ...config?.stiff, duration },
    from: { opacity: 0 },
    to: {
      opacity: show ? 1 : 0.3,
    },
    leave: { opacity: 0 },
  });

  return [fadeStyles];
};

export default useFadeSpring;
