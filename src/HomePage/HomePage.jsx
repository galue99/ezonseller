import React from 'react';
import { connect } from 'react-redux';
import { Header } from '../Header';
import './Home.css';
import $ from 'jquery';

import { userActions } from '../_actions';

class HomePage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          search: {},
          plan: ""
        };
    }

    componentDidMount(){
        $().ready(function() {
            $(".fakeloader").fadeOut();
        });
        let value = JSON.parse(localStorage.getItem('user'));
        this.setState({ plan: value.type_plan })
        if(value.type_plan !== 'Free'){
            this.props.dispatch(userActions.lastSearch());   
        }
    }


    render() {
        const { home } = this.props;
        const { plan } = this.state;
        return (
            <div>
                <Header url={this.props} />
                <div className="container">
                    {plan === 'Free' &&
                    <div>
                    <p>To enjoy the searches through our system, you must enter the profile register a credit card and then proceed to make the subscription of one of our plans.</p>
                    </div>
                    }
                    {home.items &&
                        <div className="row">
                        <h1>Last Searches</h1>
                        {home.items.length > 2 &&
                            <div className="row">
                                {home.items.slice(0, 12).map((item, index) =>
                                    <div key={index} className="col-md-4 col-xs-12">
                                    <div className="card height-card">
                                        <div className="card-img-top" style= {
                                                        { 'backgroundImage': 'url( ' + item.large_image_url + ')',
                                                            'backgroundRepeat': 'no-repeat',
                                                            'backgroundPosition': 'center',
                                                            'backgroundSize': 'contain',
                                                            'width': '100%',
                                                            'height': '250px',
                                                        }
                                                    } >
                                        </div>
                                        <div className="card-body">
                                        <h4 className="card-title title-title">{item.title}</h4>
                                        <p>Asin: {item.asin}</p>
                                        <p>Price: {item.price_and_currency}</p>
                                         <footer className="footer">
                                           <a className="btn btn-link" href={item.detail_page_url} target="_blank">Amazon</a>
                                           <a className="btn btn-link" href={'https://camelcamelcamel.com/' + item.title + '/product/' +  item.asin} target="_blank">Camel Camel Camel</a>
                                         </footer>
                                        </div>
                                    </div>
                                    </div>
                                )}
                            </div>
                        }
                        </div>
                    }
            </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { home } = state;
    const { loggingIn } = state.authentication;
    return {
        loggingIn,
        home
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
