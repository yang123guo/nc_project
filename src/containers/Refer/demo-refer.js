import { component } from 'react';

export default function(Refer) {
	return class DemoRefer extends component {
		render() {
			return <Refer {...this.props} url={'/demo-web/demo/bankRef/bankdata'} />;
		}
	};
}
