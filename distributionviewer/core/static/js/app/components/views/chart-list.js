import React from 'react';

import ChartContainer from '../containers/chart-container';


export default function(props) {
  return (
    <section className="chart-list">
      {props.metadata.map(metricMeta => {
        return (
          <ChartContainer
            key={metricMeta.id}

            metricId={metricMeta.id}
            isDetail={false}
            showOutliers={false}
          />
        );
      })}
    </section>
  );
}
