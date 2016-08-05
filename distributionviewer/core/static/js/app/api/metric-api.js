import axios from 'axios';
import store from '../store';
import {
  gettingMetrics, getMetricsSuccess, getMetricsFailure,
  gettingMetric, getMetricSuccess, getMetricFailure
} from '../actions/metric-actions';

const mockEndpoints = {
  GET_METRICS: 'http://localhost:3009/metrics',
  GET_METRIC: 'http://localhost:3009/'
};

// TODO: Check node environment to set this.
const endpoints = mockEndpoints;

// Fetch list of metrics.
export function getMetrics() {
  store.dispatch(gettingMetrics());

  return axios.get(endpoints.GET_METRICS).then(response => {
    store.dispatch(getMetricsSuccess(response.data));
    return response;
  }).catch(response => {
    console.error(response);
    store.dispatch(getMetricsFailure(response.status))
    return response;
  });
}

export function getMetric(name) {
  store.dispatch(gettingMetric());

  return axios.get(endpoints.GET_METRIC + name).then(response => {
    console.log('single metric api: ', response.data);
    store.dispatch(getMetricSuccess(response.data));
    return response;
  }).catch(response => {
    console.error(response);
    store.dispatch(getMetricFailure(response.status));
    return response;
  });
}
