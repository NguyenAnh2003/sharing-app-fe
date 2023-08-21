import { postHTTP } from '../../utils/apiConfig';

const uploadAvatar = () => {
  const res = postHTTP();
  return res;
};

export default uploadAvatar;
