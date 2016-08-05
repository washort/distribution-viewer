import React from 'react';
import { Link } from 'react-router';
import DateRangeContainer from '../containers/date-range-container';


export default function MainLayout(props) {
  return (
    <div className="global-wrapper" id="global-wrapper">
      <header className="primary-header">
        <h1><Link className="primary-header-link" to="/">Firefox Distribution Viewer</Link></h1>
        <DateRangeContainer />
      </header>
      {props.children}
    </div>
  );
}

MainLayout.propTypes = {
  children: React.PropTypes.node.isRequired,
}
