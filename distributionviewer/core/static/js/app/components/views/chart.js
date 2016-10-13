import React from 'react';
import { Link } from 'react-router';
import MG from 'metrics-graphics';

import Fetching from './fetching';


export default class extends React.Component {
  constructor(props) {
    super(props);

    // Number of x-axis ticks on the chart list page.
    this.numXTicksSmall = 4;

    // After how many characters should the x-axis labels get ellipsised?
    this.xLabelsChopLength = 8;
  }

  componentDidMount() {
    if (!this.props.isFetching) {
      this.insertOrUpdateChart();
    }
  }

  componentDidUpdate() {
    if (!this.props.isFetching) {
      this.insertOrUpdateChart();
    }
  }

  render() {
    let chart;

    if (this.props.isFetching) {
      chart = (
        <div className={`chart is-fetching chart-${this.props.metricId}`}>
          <Fetching />
        </div>
      );
    } else {
      chart = (
        <div className={`chart chart-${this.props.metricId}`}>
          <table className="chart-rollover-table">
            <tbody>
              <tr>
                <th>x</th>
                <td className="value-x" />
              </tr>
              <tr>
                <th>y</th>
                <td className="value-y" />
              </tr>
              <tr>
                <th>proportion</th>
                <td className="value-p" />
              </tr>
            </tbody>
          </table>
        </div>
      );
    }

    if (!this.props.isDetail) {
      return <Link className="chart-link" to={`/chart/${this.props.metricId}/`}>{chart}</Link>;
    } else {
      return chart;
    }
  }

  buildPointsMeta(dataPoints) {
    var pointsMeta = [];

    for (let i = 0; i < dataPoints.length; i++) {
      pointsMeta.push({
        x: dataPoints[i]['refRank'] || parseFloat(dataPoints[i]['b']),
        y: dataPoints[i]['c'] * 100,
        p: dataPoints[i]['p'] * 100,
        label: dataPoints[i]['b']
      });
    }

    return pointsMeta;
  }

  getShortLabel(lbl) {
    if (lbl.length > this.xLabelsChopLength) {
      return `${lbl.substring(0, this.xLabelsChopLength - 1)}…`;
    }
    return lbl;
  }

  insertOrUpdateChart() {
    const refLabels = {};
    const infoElm = document.querySelector(`.chart-${this.props.metricId} .chart-rollover-table`);

    if (!this.pointsMeta) {
      this.pointsMeta = this.buildPointsMeta(this.props.points);
    }

    const pointsMetaLength = this.pointsMeta.length;

    this.pointsMeta.map(chartItem => {
      refLabels['' + chartItem.x] = chartItem.label;
    });

    /* eslint-disable camelcase */
    const graphOptions = {
      target: '.chart-' + this.props.metricId,

      // Data
      data: this.pointsMeta,
      x_accessor: 'x',
      y_accessor: 'y',
      show_rollover_text: false,

      // General display
      title: this.props.name,
      full_width: true,
      area: false,
      missing_is_hidden: true,

      // y-axis
      min_y: 0,
      max_y: 100,
      yax_count: 5,
      mouseover: data => {
        infoElm.classList.add('show');
        infoElm.querySelector('.value-x').textContent = refLabels[data.x];
        infoElm.querySelector('.value-y').textContent = `${data.y.toFixed(4)}%`;
        infoElm.querySelector('.value-p').textContent = `${data.p.toFixed(4)}%`;
      },
      mouseout: () => {
        infoElm.classList.remove('show');
      },
      yax_units: '%',
      yax_units_append: true
    };

    if (this.props.type === 'category') {
      graphOptions.xax_format = d => this.getShortLabel(refLabels[d]);
      graphOptions.xax_count = this.props.isDetail ? pointsMetaLength : this.numXTicksSmall;
    }

    if (!this.props.isDetail) {
      graphOptions.height = 250;
    } else {
      graphOptions.full_height = true;
    }

    if (this.props.showOutliers) {
      graphOptions.min_x = this.pointsMeta[0].x;
      graphOptions.max_x = this.pointsMeta[pointsMetaLength - 1].x;
    } else {
      graphOptions.min_x = this.pointsMeta[Math.max(Math.round(pointsMetaLength * 0.005) - 1, 0)].x;
      graphOptions.max_x = this.pointsMeta[Math.min(Math.round(pointsMetaLength * 0.995) - 1, pointsMetaLength - 1)].x;
    }

    MG.data_graphic(graphOptions);
    /* eslint-enable camelcase */
  }
}
