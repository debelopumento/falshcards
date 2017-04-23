import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actionIndex';
import { Route, Link } from 'react-router-dom';

const { array, number, object, string } = PropTypes;

class Deck extends PureComponent {
  static PropTypes = {
    cards: array,
    cardIndex: number,
  };

  static defaultProps = {
    cards: null,
    cardIndex: 0,
  };

  state = {
    showFront: true,
  };

  flipcard = () => {
    this.setState({ showFront: !this.state.showFront });
  };

  no = () => {
    this.props.goToNextCard();
  };

  yes = () => {
    this.props.passCard(this.props.cardIndex);
  };

  deleteCard = () => {
    this.props.deleteCard(
      this.props.cards[this.props.cardIndex]._id,
      this.props.cardIndex
    );
  };

  componentWillMount() {
    const deckId = this.props.match.params.deck;
    this.props.lookupDeck(deckId);
    this.props.showCurrentDeck();
  }

  render() {
    if (this.props.cards.length !== 0 && this.props.hideDeck === false) {
      const display = this.state.showFront === true
        ? this.props.cards[this.props.cardIndex].cardFront
        : this.props.cards[this.props.cardIndex].cardBack;

      return this.props.finishedDeck === true
        ? <div>
            <span>Congratulations! You have finished this deck.</span>
            <span>
              <Link to="/">Back to dashboard</Link>
            </span>

          </div>
        : <div>
            <Link to="/">Home</Link>

            <input onClick={this.flipcard} type="submit" value={display} />
            <input onClick={this.no} type="submit" value="no" />
            <input onClick={this.yes} type="submit" value="yes" />
            <input
              onClick={this.deleteCard}
              type="submit"
              value="Delete This Card"
            />
            <Link to={`/${this.props.match.params.deck}/newCard`}>
              Add a New Card
            </Link>
          </div>;
    }
    return (
      <div>
        <Link to="/">Home</Link>

        <Link to={`/${this.props.match.params.deck}/newCard`}>
          Add a New Card
        </Link>
        <span>There are no flashcards in this deck.</span>
      </div>
    );
  }
}

export default connect(
  storeState => ({
    decks: storeState.decks,
    cards: storeState.cards,
    cardIndex: storeState.cardIndex,
    finishedDeck: storeState.finishedDeck,
    hideDeck: storeState.hideDeck,
  }),
  {
    lookupDeck: actions.lookupDeck,
    goToNextCard: actions.goToNextCard,
    passCard: actions.passCard,
    hideCurrentDeck: actions.hideCurrentDeck,
    showCurrentDeck: actions.showCurrentDeck,
    deleteCard: actions.deleteCard,
  }
)(Deck);
