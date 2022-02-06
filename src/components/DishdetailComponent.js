import React, { Component } from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle
} from 'reactstrap';

class DishDetail extends Component {

  constructor(props) {
    super(props);

    this.state = {
    }
  }

  renderDish(dish) {
    if (dish != null)
      return (
        <div className="col-12 col-md-5 m-1">
          <Card>
            <CardImg top src={dish.image} alt={dish.name} />
            <CardBody>
              <CardTitle>{dish.name}</CardTitle>
              <CardText>{dish.description}</CardText>
            </CardBody>
          </Card>
        </div>
      );
    else
      return (
        <div></div>
      );
  }

  renderComments(comments) {
    if (comments != null) {
      const cmnts = comments.map(comment => {
        return (
          <li key={comment.id}>
            <p>{comment.comment}</p>
            <p>-- {comment.author},
              &nbsp;
              {new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'short',
                day: '2-digit'
              }).format(new Date(Date.parse(comment.date)))}
            </p>
          </li>
        )
      })
      return (
        <div className="col-12 col-md-5 m-1">
          <h4> Comments </h4>
          <ul className='list-unstyled'>
            {cmnts}
          </ul>
        </div>
      );
    }
    else {
      return (
        <div></div>
      );
    }
  }

  render() {

    if (this.props.dish == null) {
      return (<div></div>);
    }

    const dishItem = this.renderDish(this.props.dish);
    const dishComment = this.renderComments(this.props.dish.comments);

    return (
      <div className="container">
        <div className="row">
          {dishItem}
          {dishComment}
        </div>
      </div>
    );
  }
}

export default DishDetail;