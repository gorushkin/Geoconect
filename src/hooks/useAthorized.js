import { useSelector } from 'react-redux';

const useAthorized = () => {
  const {
    user: { isAuthorized },
  } = useSelector((state) => state);

  return isAuthorized;
};

export { useAthorized };
