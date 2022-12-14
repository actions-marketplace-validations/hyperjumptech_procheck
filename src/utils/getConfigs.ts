import fetch from 'node-fetch';

import { Config } from '../interfaces/Config';

export interface GetConfig {
  repository: string;
  configPath: string;
  githubToken: string;
}

export const getConfigs = async ({
  repository,
  configPath,
  githubToken
}: GetConfig): Promise<Config[]> => {
  const path = configPath.includes('.json')
    ? configPath
    : `${configPath}/procheck.json`;

  const url = `https://api.github.com/repos/${repository}/contents/${path}`;

  const withToken = githubToken && {
    Authorization: `Bearer ${githubToken}`
  };

  const res = await fetch(url, {
    headers: {
      ...withToken,
      Accept: 'application/vnd.github.v3.raw'
    }
  });

  const json = await res.json();

  return json;
};
