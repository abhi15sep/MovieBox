import MovieCart from '../movie-cart';
import React from 'react';
import './movie-grid.css'

class MovieGrid extends React.Component {
    componentDidMount()
    {

    }
    onPlanetsLoaded = (planet) => {
        this.setState({
            planet,
            loading: false,
            error: false
        });
    };
    render() {

        return (<div className='movie__grid'>
            <div className='container'>
               <div className="row justify-content-around">
                <MovieCart/>
                <MovieCart/>
                <MovieCart/>
                <MovieCart/>
            </div>
            <div className="row justify-content-around">
                <MovieCart/>
                <MovieCart/>
                <MovieCart/>
                <MovieCart/>
            </div>
            <div className="row justify-content-around">
                <MovieCart/>
                <MovieCart/>
                <MovieCart/>
                <MovieCart/>
            </div>

            </div>
        </div>
    )
}

};

export default MovieGrid;