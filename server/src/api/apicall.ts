// apicall.ts

import axios from 'axios';

/**
 * Fetches the claim score from the ClaimBuster API.
 *
 * @param inputClaim - The claim text to be scored.
 * @returns The JSON response from the API.
 * @throws An error if the API request fails.
 */
export const getClaimScore = async (inputClaim: string): Promise<any> => {
  const apiKey = '02ac743e6570462e9bf5014e5293ca03';

  const url = `https://idir.uta.edu/claimbuster/api/v2/score/text/${encodeURIComponent(inputClaim)}`;

  try {
    const response = await axios.get(url, {
      headers: {
        'x-api-key': apiKey,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};