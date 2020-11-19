import React, { Component } from 'react';
import BoardsCard from '../components/Cards/BoardsCard';
import PinsCard from '../components/Cards/PinsCard';

export default class SearchResults extends Component {
  state = {
    results: [],
    searchTerm: '',
    searchType: ''
  };

  componentDidMount() {
    this.performSearch();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchTerm !== this.props.match.params.term) {
      this.performSearch();
    }
  }

  performSearch = () => {
    const searchTerm = this.props.match.params.term;
    const searchType = this.props.match.params.type;

    if (searchType === 'boards') {
      this.setState({
        searchTerm,
        searchType
      });
    } else {
      this.setState({
        searchTerm,
        searchType
      });
    }
  };

  render() {
    const { results, searchType } = this.state;

    const showResults = () =>
      results.map(result =>
        searchType === 'boards' ? (
          <BoardsCard key={result.firebaseKey} board={result} />
        ) : (
          <PinsCard key={result.firebaseKey} pin={result} />
        )
      );
    return (
      <div>
        <h1>Search Results</h1>
        {showResults()}
      </div>
    );
  }
}
