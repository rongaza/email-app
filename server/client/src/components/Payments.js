import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
	render() {
		return (
			<StripeCheckout
				name="Emaily"
				description="$5 for 5 email credits"
				// tell stripe currency type in cents
				// 500 cents or $5
				amount={500}
				// expecting to receive callback function that gets called with token
				// from stripe. token represents charge details
				// using action dispatch handleToken()
				token={token => this.props.handleToken(token)}
				stripeKey={process.env.REACT_APP_STRIPE_KEY}
			>
				<button className="btn">Add Credits</button>
			</StripeCheckout>
		);
	}
}

// since no props needed first parameter is null
export default connect(
	null,
	actions
)(Payments);
