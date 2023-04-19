import { client, v1 } from '@datadog/datadog-api-client';

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

const configuration: client.Configuration = client.createConfiguration();
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
