import { Fragment } from 'react';

const Header = (props) => {
	return (
		<Fragment>
			<h1>{props.course}</h1>
		</Fragment>
	);
};

export default Header;
