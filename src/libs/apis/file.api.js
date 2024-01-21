// user file
// post file
/**
 * user : upload, -> get avaURL
 * post : upload, -> get imageURL (video?)
 * using form data
 */

import { postHTTP } from '../../configs/api.config';

export const uploadFile = async (formData) => {
  const res = await postHTTP('media/upload', formData);
  return res;
};
