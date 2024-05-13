import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';

const useConfirmLogin = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  const confirmLogin = () => {
    if (!user) {
      const response = window.confirm(
        '로그인한 사용자만 이용 가능합니다! 로그인하시겠습니까?'
      );
      if (response) {
        navigate('/signin');
      }
      return false;
    }
    return true;
  };

  return { confirmLogin };
};

export default useConfirmLogin;
