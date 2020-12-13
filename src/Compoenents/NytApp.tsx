import React from 'react';
import NytResults from './NytResults';
const baseURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
const key = "t3aAyONPEAIsCKWF5MtGfSVaeMuMkea9";

class NytApp extends React.Component {
    state = {
        search: "",
        startDate: "",
        endDate: "",
        pageNumber: 0,
        results: []
    }

    fetchResults = () => {
        let url = `${baseURL}?api-key=${key}&page=${this.state.pageNumber}&q=${this.state.search}`;
        url = this.state.startDate ? url + `&begin_date=${this.state.startDate}` : url;
        url = this.state.endDate ? url + `&end_date=${this.state.endDate}` : url;

        fetch(url)
            .then(res => res.json())
            .then(data => this.setState({ results: data.response.docs }))
            .catch(err => console.log(err));
    };

    handleSubmit = (event: any) => {
        event.preventDefault();
        this.setState({ pageNumber: 0 });
        this.fetchResults();
    };

    changePageNumber = (event: any, direction: string) => {
        event.preventDefault();
        if (direction === 'down') {
            if (this.state.pageNumber > 0) {
                this.setState({ pageNumber: +1 },
                    () => this.fetchResults());
            }
        }
        if (direction === 'up') {
            this.setState({ pageNumber: +1 }, 
                () => this.fetchResults());
        }
    };


    render() {

        return (
            <div className="main">
                <div className="mainDiv">
                    <form onSubmit={(e) => this.handleSubmit(e)}>
                        <span>Enter a single search term (required) : </span>
                        <input type="text" name="search" onChange={(e) => this.setState({ search: e.target.value })} required />
                        <br />
                        <span>Enter a start date: </span>
                        <input type="date" name="startDate" pattern="[0-9]{8}" onChange={(e) => this.setState({ startDate: e.target.value })} />
                        <br />
                        <span>Enter an end date: </span>
                        <input type="date" name="endDate" pattern="[0-9]{8}" onChange={(e) => this.setState({ endDate: e.target.value })} />
                        <br />
                        <button className="submit">Submit search</button>
                    </form>
                    {
                        this.state.results.length > 0 ? <NytResults results={this.state.results} changePage={this.changePageNumber} /> : null
                    }
                    {
                        this.state.results.length > 0 ?
                            <div>
                                <button onClick={(e) => this.changePageNumber(e, 'down')}>Previous 10</button>
                                <button onClick={(e) => this.changePageNumber(e, 'up')}>Next 10</button>
                            </div> 
                            : null
                    }
                </div>
            </div>
        );
    }
};

export default NytApp;