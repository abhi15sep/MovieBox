import React from 'react';
import './movie-page.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faStar} from '@fortawesome/free-solid-svg-icons'
import {addFavorites, removeFavorites} from "./movie-page-actions";
import {l} from '../movie-grid/movie-grid-actions'
import ApiService from "../../services/movie-api";
import {connect} from 'react-redux'
import defautl_img from "../movie-cart/default_img.png";

class MoviePage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            api: new ApiService(),
            film: null,
            favorite: false,
        };

        this.updateFilm();


    }

    componentDidMount() {
        this.checkFavorite()
    }


    updateFilm() {
        this.state.api.getFilm(this.props.id)
            .then((film) => {
                this.setState({
                    film: film
                });
            })

    }

    checkFavorite = () => {

        const newmass = this.props.favorites.filter(items => items.id === Number(this.props.id))

        if (newmass.length !== 0) {

            this.setState({
                favorite: true
            })
        }

    }
    addFavoriteHandler = () => {
        this.setState(
            this.setState({
                favorite: true
            })
        )
        this.props.addFavorites(this.state.film);

    }
    removeFavoriteHandler = () => {
        this.setState(
            this.setState({
                favorite: false
            })
        )
        this.props.removeFavorites(this.state.film.id);

    }
    GetGenres = () => {
        this.state.api.getGenres()
            .then((res) => l(res))
    }

    render() {
        const {film} = this.state;
        return (
            <div>
                <div className="container">
                    <div className="row movie__overview">
                        {film &&
                        <>
                            {/*    <img src={`http://image.tmdb.org/t/p/w342${film.backdrop_path}`} alt=""/>*/}
                            <div className="col-3 d-flex justify-content-center flex-column">
                                {film.poster_path ? (
                                    <img src={`http://image.tmdb.org/t/p/w300${film.poster_path}`}
                                         alt={'rtrt'}/>
                                ) : (<img src={defautl_img} alt={'rtrt'}/>)
                                }

                                {
                                    this.state.favorite ?
                                        (<button onClick={this.removeFavoriteHandler}
                                                 className="favorite remove__favorite">removes from
                                                favorites <FontAwesomeIcon
                                                    icon={faStar}/>
                                            </button>

                                        ) :
                                        (<button
                                                onClick={this.addFavoriteHandler}
                                                className=" favorite add__favorite">Add to
                                                favorites <FontAwesomeIcon
                                                    icon={faStar}/>
                                            </button>
                                        )
                                }
                            </div>
                            < div className="col-9">
                                <h1>Overview</h1>
                                <span>{film.overview}</span>
                            </div>
                        </>
                        }


                    </div>
                </div>
            </div>
        );
    }
}

let
    mapStateToProps = state => {

        return {
            favorites: state.favorites,
        }
    }
export default connect(mapStateToProps, {addFavorites, removeFavorites})(MoviePage);

