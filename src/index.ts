import { client, v1 } from '@datadog/datadog-api-client';
import { BaseServerConfiguration } from '@datadog/datadog-api-client/dist/packages/datadog-api-client-common';
import { ConfigurationParameters } from '@datadog/datadog-api-client/dist/packages/datadog-api-client-common/configuration';
import dotenv from 'dotenv';

dotenv.config();

const apiKey: string | undefined = process.env.API_KEY;
const appKey: string | undefined = process.env.APP_KEY;
const baseServerUrl: string | undefined = process.env.BASE_SERVER_URL;

const getDashboardId = (): string => {
  // Getting the url from the input parameter
  const url: string = process.argv[2];
  const pattern: RegExp = /\/dashboard\/([a-z0-9]{3}-){2}[a-z0-9]{3}\?/;
  const match: RegExpMatchArray | null = url.match(pattern);
  if (match && match[0]) {
    return match[0].replace('/dashboard/', '').replace('?', '');
  } else {
    console.error('Error: The dashboard ID could not be found');
    return '';
  }
};

const handleDatadog = (
  apiKey: string,
  appKey: string,
  baseServerUrl: string
) => {
  const configurationOpts: ConfigurationParameters = {
    baseServer: new BaseServerConfiguration(baseServerUrl, {}),
    authMethods: {
      apiKeyAuth: apiKey,
      appKeyAuth: appKey,
    },
  };
  const configuration: client.Configuration =
    client.createConfiguration(configurationOpts);

  const apiInstance: v1.DashboardsApi = new v1.DashboardsApi(configuration);
  const dashboardId: string = getDashboardId();
  const params: v1.DashboardsApiGetDashboardRequest = {
    dashboardId,
  };

  apiInstance
    .getDashboard(params)
    .then((data: v1.Dashboard) => {
      console.log(
        'API called successfully. Returned data: ' + JSON.stringify(data)
      );
    })
    .catch((error: any) => console.error(error));
};

if (apiKey && appKey && baseServerUrl) {
  handleDatadog(apiKey, appKey, baseServerUrl);
} else {
  console.error('Not all credentials are provided');
}
