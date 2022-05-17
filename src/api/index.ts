import axios from 'axios';
import {AccountInterface} from 'starknet';

const isMainnet = process.env.REACT_APP_ENV === 'MAINNET';

const corsHeader = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
};

export const useApi = () => {
  const apiUrl = isMainnet ? 'https://zkpad-api.herokuapp.com' : 'https://zkpad-api.herokuapp.com';

  const getAuthToken = async (address: string | null | undefined) => {
    let result = await axios({
      method: 'post',
      url: `${apiUrl}/auth/getToken`,
      data: {address: address}
      // headers: {'Content-Type': 'application/json', ...corsHeader}
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
        Authorization: `Bearer ${authToken}`
        // ...corsHeader
      }
    });

    return res.data;
  };

  const validateQuest = async (authToken: string | null | undefined, questId: string) => {
    const res = await axios({
      method: 'post',
      url: `${apiUrl}/quest/onQuestCompleted`,
      headers: {
        Authorization: `Bearer ${authToken}`
        // ...corsHeader
      },
      data: {questId}
    });

    return res.data;
  };

  return {getAuthToken, getAccountDetails, validateQuest};
};
