import axios from './http-client';

const uploadCSVFile = async ({ data }) => {
  try {
    const response = await axios.post('/upload', data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default {
  uploadCSVFile,
};