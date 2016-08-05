import React from 'react';
import { connect } from 'react-redux';

import ChartList from '../views/chart-list';
import * as metricApi from '../../api/metric-api';


const ChartListContainer = React.createClass({
  componentDidMount: function() {
    metricApi.getMetrics();
  },
  render: function() {
    return (<ChartList {...this.props} />);
  }
});

const mapStateToProps = function(store) {
  return {
    isFetching: store.metricState.isFetching,
    items: store.metricState.items,
    status: store.metricState.status
  };
}

export default connect(mapStateToProps)(ChartListContainer);
