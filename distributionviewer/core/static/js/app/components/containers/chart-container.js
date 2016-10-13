import React from 'react';
import { connect } from 'react-redux';

import Chart from '../views/chart';
import * as metricApi from '../../api/metric-api';

class ChartContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    metricApi.getMetric(this.props.metricId);
  }

  render() {
    if (!this.props.metric) {
      return <Chart isFetching={true} {...this.props} />;
    } else {
      return (
        <Chart
          isFetching={false}
          name={this.props.metric.metric}
          points={this.props.metric.points}
          type={this.props.metric.type}
          {...this.props}
        />
      );
    }
  }
}

const mapStateToProps = function(store, ownProps) {
  return {
    metric: store.metricState.metrics[ownProps.metricId],
  };
};

export default connect(mapStateToProps)(ChartContainer);
