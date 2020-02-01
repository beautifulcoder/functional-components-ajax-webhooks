import React, { useEffect } from 'react';
import { mapDispatchToProps, mapStateToProps } from './store/dummyStore';
import { connect } from 'react-redux';

export const DummyComponent = ({isInit, isError, isLoading, loadInitStateData, firstName}) =>
  <>
    {useEffect(() => {!isInit && loadInitStateData()})}
    {isLoading && (<p>Loading...</p>)}
    {isError && (<p>An error occurred.</p>)}
    {!isLoading && !isError && isInit && (<p>Hello {firstName}.</p>)}
  </>;

export default connect(mapStateToProps, mapDispatchToProps)(DummyComponent);
