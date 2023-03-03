// Work In Progress !!!!!
// Don't use !!!
import axios, { Axios, AxiosRequestConfig } from "axios";
import { reactive, ref } from "vue";

class RequestRecords {
  private requestRecordMap: Map<string, Function>;
  constructor() {
    this.requestRecordMap = new Map();
  }

  public removeRequestRecordFromMap(config: AxiosRequestConfig) {
    const pendingKey = this.generateRequestKey(config);
    if (this.requestRecordMap.has(pendingKey)) {
      const cancelToken = this.requestRecordMap.get(pendingKey);
      cancelToken(pendingKey);
      this.requestRecordMap.delete(pendingKey);
    }
  }

  private generateRequestKey(config: AxiosRequestConfig) {
    let { url, method, params, data } = config;
    if (typeof data === "string") data = JSON.parse(data);
    return [url, method, JSON.stringify(params), JSON.stringify(data)].join(
      "&"
    );
  }

  public addRequestRecord(config: AxiosRequestConfig) {
    const pendingKey = this.generateRequestKey(config);
    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken((cancel) => {
        if (!this.requestRecordMap.has(pendingKey)) {
          this.requestRecordMap.set(pendingKey, cancel);
        }
      });
  }
}
export class HttpClient {
  private defaultConfig = {
    baseURL: "http://localhost:8888",
    timeout: 10000,
  };
  private requestRecordMap: RequestRecords;
  private service: Axios;

  constructor(config: AxiosRequestConfig) {
    this.service = axios.create({ ...this.defaultConfig, ...config });
    this.requestRecordMap = new RequestRecords();

    this.service.interceptors.request.use(
      (config) => {
        this.requestRecordMap.removeRequestRecordFromMap(config);
        this.requestRecordMap.addRequestRecord(config);
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.service.interceptors.response.use(
      (response) => {
        this.requestRecordMap.removeRequestRecordFromMap(response.config);

        return response;
      },
      (error) => {
        this.requestRecordMap.removeRequestRecordFromMap(error.config);
        return Promise.reject(error);
      }
    );
  }

  public request(config: AxiosRequestConfig) {
    return this.service.request(config);
  }
}

export default new HttpClient({});

export const useHttp = (request: Promise<Object>) => {
  let isLoading = ref(false);
  let isFetching = ref(false);
  let isError = ref(false);
  let result = undefined;

  request
    .then((res) => {
      result = res;
    })
    .catch((e) => {
      result = e;
    });

  return {
    isLoading,
    isFetching,
    isError,
    result,
  };
};
