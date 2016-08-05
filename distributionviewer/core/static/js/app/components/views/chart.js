import React from 'react';
import { Link } from 'react-router';

import MG from 'metrics-graphics';


function formatData(item) {
  var result = [];
  var data = item.points;

  for (let i = 0; i < data.length; i++) {
    result.push({
      x: data[i]['refRank'],
      y: data[i]['c'] * 100,
      label: data[i]['b']
    });
  }
  return result;
}

function generateChart(name, chart, width, height) {
  var refLabels = {};
  var formattedData = formatData(chart);

  formattedData.map(chartItem => {
    refLabels['' + chartItem.x] = chartItem.label;
  });

  /* eslint-disable camelcase */
  MG.data_graphic({
    target: '.' + name,

    // Data
    data: formattedData,
    x_accessor: 'x',
    y_accessor: 'y',

    // General display
    title: chart.metric,
    width,
    height,
    area: false,
    missing_is_hidden: true,
    axes_not_compact: false,

    // x-axis
    x_mouseover: data => 'x: ' + data.x + '%',
    xax_format: d => refLabels[d],
    xax_count: formattedData.length,

    // y-axis
    max_y: 100,
    y_mouseover: data => '   y: ' + data.y + '%',
  });
  /* eslint-enable camelcase */
}

export class Chart extends React.Component {
  componentDidMount() {
    if (this.props.isDataReady) {
      //generateChart(this.props.chartName, this.props.item, this.props.width, this.props.height);
    }
  }
  render() {
    var chart = <div className={this.props.chartName} />;

    if (this.props.isDataReady) {
      console.log('dataReady:', this.props.chartName, this.props.item);
      generateChart(this.props.chartName, this.props.item, this.props.width, this.props.height);
    }

    if (this.props.link) {
      return <Link to="/chart/1/">{chart}</Link>;
    } else {
      return chart;
    }
  }
}

Chart.propTypes = {
  height: React.PropTypes.number.isRequired,
  link: React.PropTypes.bool.isRequired,
  width: React.PropTypes.number.isRequired,
}
