import axios from 'axios';

const isMainnet = process.env.REACT_APP_ENV === 'MAINNET';

const corsHeader = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
};

export const useApi = () => {
  const apiUrl = isMainnet ? 'https://zkpad-api.herokuapp.com' : 'http://localhost:5001';

  const getAuthToken = async (address: string | null | undefined) => {
    let result = await axios({
      method: 'post',
      url: `${apiUrl}/auth/getToken`,
      data: JSON.stringify({address: address}),
      headers: {'Content-Type': 'application/json', ...corsHeader}
    });
    if (result.data.status === 'success') {
      let token = result.data.token;
      return token;
    }
    return null;
  };

  const getAccountDetails = async (authToken: string | null | undefined) => {
    const res = await axios({
      method: 'get',
      url: `${apiUrl}/account/getaccountinfo`,
      headers: {
        Authorization: `Bearer ${authToken}`,
        ...corsHeader
      }
    });

    return res.data;
  };

  return {getAuthToken, getAccountDetails};
};
