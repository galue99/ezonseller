import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { userActions } from '../_actions';

class Profile extends React.Component {

    super(props){
        this.handleDeleteCard             = this.handleDeleteCard.bind(this);
        this.handleDeleteAmazonAssociate  = this.handleDeleteAmazonAssociate.bind(this);
        this.handleDeleteEbayAssociate    = this.handleDeleteEbayAssociate.bind(this);
    }

    handleDeleteCard(data, e){
        this.props.dispatch(userActions.deleteCreditCard(data));
    }

    handleDeleteAmazonAssociate(id){
        this.props.dispatch(userActions.deleteAmazonAssociate(id));
    }

    handleDeleteEbayAssociate(id){
        this.props.dispatch(userActions.deleteEbayAssociate(id));
    }


    render() {
        const { user, paymentsPlans } = this.props;
        let valueUser = JSON.parse(localStorage.getItem('user'));
        var divStyle = {
            'backgroundImage': 'url(data:image/png;base64,' + user.items.photo64 + ')',
            'backgroundRepeat': 'no-repeat',
            'backgroundPosition': 'center',
            'backgroundSize': 'cover',
            'width':  '120px',
            'height': '120px',
            'borderRadius': '50%',
            'backgroundColor': '#4487c5',
            'display': 'inline-block'
          };
          console.log(userActions.items);

        return (
            <div className="">
                <div className="col-12 section-data">
                    <div className="row">
                        <div className="col-12">
                            {user.items.photo64 === "" &&
                            <div>
                                <div style={divStyle}></div>
                                <div className="content-data">
                                    <h3>{user.items.first_name} {user.items.last_name}</h3>
                                    <h5>{user.items.username}</h5>
                                    <h5>{user.items.email}</h5>
                                </div>
                            </div>
                            }
                            <div>
                                {user.items.photo64 !== "" &&
                                  <div>
                                    <div style={divStyle}></div>
                                    <div className="content-data">

                                        <h3>{user.items.first_name} {user.items.last_name}</h3>
                                        <h5>{user.items.username}</h5>
                                        <h5>{user.items.email}</h5>
                                    </div>
                                  </div>

                                }
                            </div>

                            <div className="btn-group btn-opt">
                                <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                  Action
                                </button>
                                <div className="dropdown-menu">
                                    <Link to={"/edit-profile/" + valueUser.id} className="dropdown-item">Edit Profile</Link>
                                    <Link to={"/edit-password/"} className="dropdown-item">Change Password</Link>
                                    <Link to={"/amazon-key/"} className="dropdown-item">Add Amazon Key</Link>
                                    {user.items.ebay_account.length == 0 &&
                                    <Link to={"/ebay-key/"} className="dropdown-item">Add Ebay Key</Link>
                                    }
                                    <Link to={"/payment-history/"} className="dropdown-item">Payment History</Link>
                                    <Link to={"/support/"} className="dropdown-item">Support</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 no-padding">
                    <div>
                        {user.items &&
                        <div>
                            <Link to={"/credit-card"} className="btn btn-primary rigth-input rigth-add">Add Credit Card</Link>
                            <div className="data-credit">
                                <h2>Credit Card</h2>
                                <div className="col-12 no-padding">
                                  <div className="row">
                                    {user.items.credit_cards.map((credit, index) =>

                                        <div className="col-md-3" key={credit.id}>
                                              <h5>Name: {credit.name}</h5>
                                              <h5>Credit Card Number: {credit.number_card}</h5>
                                              <h5>Date Expiration: {credit.date_expiration}</h5>
                                              <button className="btn btn-danger" onClick={this.handleDeleteCard.bind(this, credit.id)}>Delete</button>
                                              <Link to={"/edit-credit-card/" + credit.id} className="btn btn-warning">Update</Link>
                                        </div>
                                    )}
                                  </div>
                                </div>
                            </div>

                        </div>
                            }
                    </div>
                </div>

                <div className="col-12 no-padding">
                    <div>
                        {user.items &&
                        <div>
                            {user.items.plan_subscription.length > 0 &&
                            <div className="data-credit">
                                <h2>Plan Purchase</h2>
                                <div className="col-12 no-padding">
                                    {user.items.plan_subscription.map((plan, index) =>
                                    <div key={plan.id}>
                                        <h5>Name: {plan.title}</h5>
                                        <h5>Description: {plan.description}</h5>
                                        <h5>Date Start: {new Date(plan.date_start).toDateString()}</h5>
                                        <h5>Date Finish: {new Date(plan.date_finish).toDateString()}</h5>
                                        <Link to={"/cancel-plan/" + user.items.id_plan} className="btn btn-danger">Cancel Plan</Link>
                                    </div>
                                        )}
                                </div>
                            </div>
                                }
                        </div>
                            }
                    </div>
                </div>

                <div className="col-12 no-padding">
                    <div>
                        {user.items &&
                        <div>
                            {user.items.plan_subscription.length === 0 &&
                            <div>
                                <h2>Plans</h2>
                                {paymentsPlans.items &&
                                <div className="data-credit">
                                    {paymentsPlans.items.map((payment, index) =>
                                    <div  key={payment.id}>
                                        <div>
                                            <Link to={"/acquire-plan/" + payment.id} className="btn btn-primary rigth-add">Acquire Plan</Link>
                                        </div>
                                        <h5>Name: {payment.title}</h5>
                                        <h5>Cost: {payment.cost} $</h5>
                                    </div>
                                        )}
                                </div>
                                    }
                            </div>
                                }
                        </div>
                            }
                    </div>
                </div>

                <div className="col-12 no-padding">
                    <div>
                        {user.items &&
                        <div>
                            <Link to={"/amazon-key/"} className="btn btn-primary rigth-input rigth-add">Add Amazon Key</Link>
                            {user.items.amazon_account.length !== 0 &&
                            <div>
                                <h2>Amazon Associate</h2>
                                {paymentsPlans.items &&
                                <div className="data-credit">
                                    {user.items.amazon_account.map((amazon, index) =>
                                    <div  key={amazon.id}>

                                        <h5>Name: {amazon.associate_tag}</h5>
                                        <h5>Cost: {amazon.access_key_id}</h5>
                                          <div>
                                          <button className="btn btn-danger" onClick={this.handleDeleteAmazonAssociate.bind(this, amazon.id)}>Delete</button>
                                          </div>
                                    </div>
                                        )}
                                </div>
                                    }
                            </div>
                            }
                        </div>
                            }
                    </div>
                </div>
                <div className="col-12 no-padding">
                    <div>
                        {user.items &&
                        <div>
                            {user.items.ebay_account.length == 0 &&
                                <Link to={"/ebay-key/"} className="btn btn-primary rigth-input rigth-add">Add Ebay Key</Link>
                            }
                            {user.items.ebay_account.length !== 0 &&
                            <div>
                                <h2>Ebay Associate</h2>
                                <div className="data-credit">
                                    {user.items.ebay_account.map((ebay, index) =>
                                    <div  key={ebay.id}>

                                        <h5>Client Id: {ebay.client_id}</h5>
                                          <div>
                                              <button className="btn btn-danger" onClick={this.handleDeleteEbayAssociate.bind(this, ebay.id)}>Delete</button>
                                          </div>
                                    </div>
                                    )}
                                </div>
                            </div>
                            }
                        </div>
                            }
                    </div>
                </div>
                <br/><br/><br/><br/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { user, paymentsPlans } = state;
    return {
        user,
        paymentsPlans
    };
}

const connectedProfile = connect(mapStateToProps)(Profile);
export { connectedProfile as Profile };
