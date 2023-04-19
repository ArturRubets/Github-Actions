"use strict";
/**
 * Get a dashboard returns "OK" response
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const datadog = __importStar(require("@datadog/datadog-api-client"));
const getDashboardId = () => {
    // Getting the url from the input parameter
    const url = process.argv[2];
    const pattern = /\/dashboard\/([a-z0-9]{3}-){2}[a-z0-9]{3}\?/;
    const match = url.match(pattern);
    if (match && match[0]) {
        return match[0].replace('/dashboard/', '').replace('?', '');
    }
    else {
        console.error('Error: The dashboard ID could not be found');
        return '';
    }
};
const configuration = datadog.client.createConfiguration();
const apiInstance = new datadog.v1.DashboardsApi(configuration);
// there is a valid "dashboard" in the system
const dashboardId = getDashboardId();
const params = {
    dashboardId,
};
apiInstance
    .getDashboard(params)
    .then((data) => {
    console.log('API called successfully. Returned data: ' + JSON.stringify(data));
})
    .catch((error) => console.error(error));
