import { postHTTP } from '../../utils/apiConfig';

const uploadFile = () => {
  const res = postHTTP();
  return res;
};

export default uploadFile;
