import * as core from '@actions/core';
import { client, v1 } from '@datadog/datadog-api-client';
import { BaseServerConfiguration } from '@datadog/datadog-api-client/dist/packages/datadog-api-client-common';
import { ConfigurationParameters } from '@datadog/datadog-api-client/dist/packages/datadog-api-client-common/configuration';

const [dashBoardUrl, apiKey, appKey, baseServerUrl]: (string | undefined)[] =
  process.argv.slice(2);

const checkEnvironmentParams = (): void => {
  if (!dashBoardUrl) {
    core.setFailed('DashBoard url is missing');
    process.exit(1);
  }

  if (!apiKey) {
    core.setFailed('API key is missing');
    process.exit(1);
  }

  if (!appKey) {
    core.setFailed('APP key is missing');
    process.exit(1);
  }

  if (!baseServerUrl) {
    core.setFailed('Base Server Url is missing');
    process.exit(1);
  }
};

const getDashboardId = (): string => {
  const pattern: RegExp = /\/dashboard\/([a-z0-9]{3}-){2}[a-z0-9]{3}\?/;
  const match: RegExpMatchArray | null = dashBoardUrl.match(pattern);
  if (match && match[0]) {
    return match[0].replace('/dashboard/', '').replace('?', '');
  } else {
    console.error('Error: The dashboard ID could not be found');
    return '';
  }
};

const handleDatadog = (dashboardId: string): void => {
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

checkEnvironmentParams();

const dashboardId: string = getDashboardId();
handleDatadog(dashboardId);
