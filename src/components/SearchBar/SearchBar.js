import React, { useReducer } from 'react';
import "./SearchBar.css";

// const sortByOptions = {
//     'Best Match': 'best_match',
//     'Highest Rated': 'rating',
//     'Most Reviewed': 'review_count'
// }

// const reducer = (state, action, input) => {
//     switch (action.type) {
//         case 'sortBy change': return { sortBy: input };
//         case 'location change': return { location: input };
//         case 'term change': return { term: input };
//         default: return state;
//     }
// }

// const [state, dispatch] = useReducer(reducer, {
//     term: '',
//     location: '',
//     sortBy: 'best_match',
// });

// const SearchBar = () => {

// }


const sortByOptions = {
    'Best Match': 'best_match',
    'Highest Rated': 'rating',
    'Most Reviewed': 'review_count'
}

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            term: '',
            location: '',
            sortBy: 'best_match'
        };
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
        this.getSortByClass = this.getSortByClass.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    renderSortByOptions() {
        return Object.keys(sortByOptions).map(sortByOption => {
            let sortByOptionValue = sortByOptions[sortByOption];
            return <li
                key={sortByOptionValue}
                className={this.getSortByClass(sortByOptionValue)}
                onClick={this.handleSortByChange.bind(this, sortByOptionValue)}
            >
                {sortByOption}
            </li>;
        });
    }

    getSortByClass(sortByOption) {
        if (this.state.sortBy === sortByOption) return 'active';
        else return '';
    }

    handleSortByChange(sortBy) {
        this.setState({ sortBy });
    }

    handleTermChange(event) {
        this.setState({ term: event.target.value });
    }

    handleLocationChange(event) {
        this.setState({ location: event.target.value });
    }

    handleSearch(event) {
        this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
        // event.preventDefault();
    }

    render() {
        return (
            <div className="SearchBar">
                <div className="SearchBar-sort-options">
                    <ul>
                        {this.renderSortByOptions()}
                    </ul>
                </div>
                <div className="SearchBar-fields">
                    <input placeholder="Search Businesses" onChange={this.handleTermChange} />
                    <input placeholder="Where?" onChange={this.handleLocationChange} />
                </div>
                <div className="SearchBar-submit" onClick={this.handleSearch}>
                    <a>Let's Go</a>
                </div>
            </div>
        )
    }
}

export default SearchBar;