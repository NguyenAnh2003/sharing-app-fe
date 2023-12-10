// user file
// post file
/**
 * user : upload, -> get avaURL
 * post : upload, -> get imageURL (video?)
 * using form data
 */

import { postHTTP } from '../../configs/api.config';

export const uploadFile = async (url, formData) => {
  const res = await postHTTP(url, formData);
  return res;
};
