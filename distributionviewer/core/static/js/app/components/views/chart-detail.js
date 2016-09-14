import React from 'react';
import Switch from 'react-ios-switch';

import { ChartContainer } from '../containers/chart-container';


export class ChartDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showOutliers: false};
    this.toggleOutliers = this.toggleOutliers.bind(this);
  }

  toggleOutliers(checked) {
    this.setState({showOutliers: checked});
  }

  render() {
    let options = [];

    // Only show the "Show outliers" switch when it would have an effect
    if (this.props.item.type === 'numeric' && this.props.item.points.length >= 100) {
      options.push(
        <label key="show-outliers" className="show-outliers">
          Show outliers
          <Switch
            checked={this.state.showOutliers}
            onChange={this.toggleOutliers}
            onColor='#4A90E2' // $mild-blue
          />
        </label>
      );
    }

    return (
      <div className="chart-detail">
        <div className="options">{options}</div>
        <ChartContainer isDetail={true} chartId={this.props.params.chartId} chartName={this.props.params.metricName} showOutliers={this.state.showOutliers} />
      </div>
    );
  }
}

ChartDetail.propTypes = {
  item: React.PropTypes.object.isRequired,
  params: React.PropTypes.object.isRequired
};
