import React from 'react';
import { Router, Route, hashHistory } from 'react-router';

import IcApply from './ic_apply';
import IcTable from './ic_table'; 
import Liyxt from './liyxt';
import IcForm from './ic_form';
import IcInsertTable from './ic_insertTable';
import IcSimpleSearch from './ic_simpleSearch';
import VerifyForm from './form_verify_test'; 
import FinanceMessageMain from './finance/finance_message/main';
import FinanceMessageCard from './finance/finance_message/card';
import FinanceMessageList from './finance/finance_message/list';
import BankFilesList from './baseDoc/bank/list';

// import TestComponent from './test_anchor/test_nccomponent';
// import TestTabs from './test_anchor/test_tabsAndAnchor';
// import TabsAndAnchor1 from './test_anchor';
// import TabsAndAnchor2 from './test_anchor/anchor';

export default (
	<Router history={hashHistory}>
		<Route path="/" component={IcApply} />
		<Route path="/table" component={IcTable} /> 
		<Route path="/liyxt" component={Liyxt} /> 
		<Route path="/form" component={IcForm} />
		<Route path="/IcInsertTable" component={IcInsertTable} />
		<Route path="/simpleSearch" component={IcSimpleSearch} />
		<Route path="/verifyForm" component={VerifyForm} />
		<Route path="/finance/finance_message/main" component={FinanceMessageMain} />
		<Route path="/finance/finance_message/card" component={FinanceMessageCard} />
		<Route path="/finance/finance_message/list" component={FinanceMessageList} />
		<Route path="/baseDoc/bank/list" component={BankFilesList} />
		{/* <Route path="/TestComponent" component={TestComponent} /> 
		<Route path="/TestTabs" component={TestTabs} /> 
		<Route path="/TabsAndAnchor1" component={TabsAndAnchor1} /> 
		<Route path="/TabsAndAnchor2" component={TabsAndAnchor2} />  */}
	</Router>
);
