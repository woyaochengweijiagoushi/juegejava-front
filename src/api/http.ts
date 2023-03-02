// Work In Progress !!!!!
// Don't use !!!
import axios from "axios";

const pendingMap = new Map();

function myAxios(axiosConfig, customOptions) {
  const service = axios.create({
    baseURL: "http://localhost:8888", // 设置统一的请求前缀
    timeout: 10000, // 设置统一的超时时长
  });

  let custom_options = Object.assign(
    {
      repeat_request_cancel: true,
      loading: false,
      reduct_data_format: true,
      error_message_show: true,
      code_message_show: false,
    },
    customOptions
  );

  service.interceptors.request.use(
    (config) => {
      removePending(config);
      addPending(config);

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  service.interceptors.response.use(
    (response) => {
      removePending(response.config);

      return custom_options.reduct_data_format ? response.data : response;
    },
    (error) => {
      error.config && removePending(error.config);
      return Promise.reject(error);
    }
  );

  return service(axiosConfig);
}

export default myAxios;

function addPending(config) {
  const pendingKey = getPendingKey(config);
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken((cancel) => {
      if (!pendingMap.has(pendingKey)) {
        pendingMap.set(pendingKey, cancel);
      }
    });
}

function removePending(config) {
  const pendingKey = getPendingKey(config);
  if (pendingMap.has(pendingKey)) {
    const cancelToken = pendingMap.get(pendingKey);
    cancelToken(pendingKey);
    pendingMap.delete(pendingKey);
  }
}

function getPendingKey(config) {
  let { url, method, params, data } = config;
  if (typeof data === "string") data = JSON.parse(data);
  return [url, method, JSON.stringify(params), JSON.stringify(data)].join("&");
}

const useHttp = () => {};
