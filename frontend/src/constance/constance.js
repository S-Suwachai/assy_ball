// ========== connecting ==========
export const apiUrl = "http://localhost:2024/api/";

// ========== Path ==========
export const server = {
    NMB_realtime_MBRC_Ball: `api_nmbAssy/test_realtime_MBRC_Ball`,
};

// ========== Error ==========
export const E_PICKER_CANCELLED = "E_PICKER_CANCELLED";
export const E_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR =
    "E_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR";
export const E_PERMISSION_MISSING = "E_PERMISSION_MISSING";
export const E_PICKER_NO_CAMERA_PERMISSION = "E_PICKER_NO_CAMERA_PERMISSION";
export const E_USER_CANCELLED = "E_USER_CANCELLED";
export const E_UNKNOWN = "E_UNKNOWN";
export const E_DEVELOPER_ERROR = "E_DEVELOPER_ERROR";
export const TIMEOUT_NETWORK = "ECONNABORTED"; // request service timeout
export const NOT_CONNECT_NETWORK = "NOT_CONNECT_NETWORK";

export const NETWORK_CONNECTION_MESSAGE =
    "Cannot connect to server, Please try again.";
export const NETWORK_TIMEOUT_MESSAGE =
    "A network timeout has occurred, Please try again.";
export const UPLOAD_PHOTO_FAIL_MESSAGE =
    "An error has occurred. The photo was unable to upload.";
