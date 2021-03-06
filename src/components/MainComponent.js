import React, { Component } from 'react';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import  About from  './AboutComponent';
import  Menu from  './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Contact from './ContactComponent';
import Footer from './FooterComponent';
import { DISHES } from '../shared/dishes';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';
import { COMMENTS } from '../shared/comments';
import { Switch, Route, Redirect } from 'react-router-dom';
/* .. ------> go up one level src  */
/*---Container */

class Main  extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      comments : COMMENTS,
      leaders : LEADERS,
      promotions : PROMOTIONS
 
    };
  }

  
  render(){
      const HomePage = () => {
        return (
          <Home dish={this.state.dishes.filter((dish) => dish.featured)[0]} 
                promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
                leader={this.state.leaders.filter((leader) => leader.featured)[0]}

          />
        );
      }
     
      const DishWithId = ({match}) =>{
        return(
          <Dishdetail  dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId ,10))[0]}
           comments={this.state.comments.filter((comments) => comments.dishId === parseInt(match.params.dishId ,10))}/>
        );
      }

    return (
    <div>
    <Header />
    <Switch>
       <Route path='/home' component={HomePage} />
       <Route path='/aboutus' component={() => <About leaders={this.state.leaders} />} />
       <Route exact path='/menu' component={() => <Menu dishes={this.state.dishes} />} /> 
       <Route path='/menu/:dishId' component={DishWithId} />
       <Route exact path='/contact' component={Contact } />
       <Redirect to="/home" />    
    </Switch>   
    < Footer />
    </div>
  );
}
}

export default Main;
