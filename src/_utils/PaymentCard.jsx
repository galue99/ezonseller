import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import $ from 'jquery';


import { userActions } from '../_actions';

class PaymentCard extends React.Component {
    
    constructor(props) {
            super(props);

            this.state = {
                card:{},
                submitted: false
            };

            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
            this.handleCreditCardTypeFromNumber = this.handleCreditCardTypeFromNumber.bind(this)
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { card } = this.state;
        this.setState({
            card: {
                ...card,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ submitted: true });
        const { card } = this.state;
        const { dispatch } = this.props;
        if (card.first_name && card.last_name && card.number_card && card.cod_security &&  card.year && card.month) {
            let type_card = this.handleCreditCardTypeFromNumber(card.number_card);
            card.date_expiration = '20' + card.year + '-' + card.month + '-01';
            card.type_card = type_card;
            $().ready(function() {
                var value =  $("#creditCard_form").val();
                if(value) {
                    $(".fakeloader").show();
                    dispatch(userActions.addCreditCard(card));
                }
            });
            
            
        }
    }
    handleCreditCardTypeFromNumber(num) {
        // first, sanitize the number by removing all non-digit characters.
        num = num.replace(/[^\d]/g,'');
        // now test the number against some regexes to figure out the card type.
        if (num.match(/^5[1-5]\d{14}$/)) {
          return 'mastercard';
        } else if (num.match(/^4\d{15}/) || num.match(/^4\d{12}/)) {
          return 'visa';
        } else if (num.match(/^3[47]\d{13}/)) {
          return 'americanexpress';
        } else if (num.match(/^6011\d{12}/)) {
          return 'discover';
        }
        return 'UNKNOWN';
      }


    render() {
        const { registering  } = this.props;
        return (
            <div className="">
                <div className="container">
                    <h2 className="text-center">Add Credit Card</h2>
                    <div className="col-md-7 content-edit col-center">
                        <div className="row d-flex justify-content-center">
                            <div className="col-md-6">
                                <form name="form" id="formCreditCard" onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="number">Card Number</label>
                                        <input type="text" className="form-control" name="number_card" onChange={this.handleChange} required />
                                   </div>
                                    <div className="form-group">
                                        <label htmlFor="name">First Name</label>
                                        <input type="text" className="form-control" name="first_name"  onChange={this.handleChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="name">Last Name</label>
                                        <input type="text" className="form-control" name="last_name"  onChange={this.handleChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="cod_security">Cod Security</label>
                                        <input type="text" className="form-control" name="cod_security"  onChange={this.handleChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="year">Exp. Year</label>
                                        <input type="text" className="form-control" placeholder="Example: 18" name="year" onChange={this.handleChange} required />
                                        <input type="hidden" name="creditCard_form" id="creditCard_form" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="month">Exp. Month</label>
                                        <input type="text" className="form-control" placeholder="Example: 01" name="month" onChange={this.handleChange} required />
                                    </div>

                                    <div className="form-group">
                                        <button className="btn btn-primary">Add Credit Card</button>
                                        {registering &&
                                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" alt="logo" />
                                        }
                                        <Link to="/profile" className="btn btn-danger">Cancel</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { card } = state;
    return {
        card
    };
}

const connectedPaymentCard= connect(mapStateToProps)(PaymentCard);
export { connectedPaymentCard as PaymentCard };