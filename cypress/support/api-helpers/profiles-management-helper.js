import { getHeader } from "./header-helper";
import { RequestHelper } from "./request-helper";
let endPoint = '';

export const ProfilesManagementHelper = {

    getUser(userId) {
        endPoint = `/v1/profile/${userId}`;
        RequestHelper.sendGetRequest(endPoint, getHeader());
    },
    addProfile(body) {
        endPoint = `/v1/profile`;
        RequestHelper.sendPostRequest(endPoint, getHeader(), body);
    }
}