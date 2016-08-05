import React from 'react';
//import MG from 'metrics-graphics';

import ChartContainer from '../containers/chart-container';

export default function(props) {
  return (
    <section className="chart-list">
      {props.items.map(chart => {
        return (
          <ChartContainer key={chart.slug} width={350} height={250} link={true} chartName={chart.name} />
        );
      })}
    </section>
  );
}
