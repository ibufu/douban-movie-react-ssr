import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { loadMovieDetail } from '../../actions/movieDetail';
import Loading from '../../components/Loading';

import './MovieDetail.css';

class MovieDetail extends React.PureComponent {

    static loadData(option) {
        if (option.store) {
            return option.store.dispatch(loadMovieDetail(option.props.params.id));
        } else {
            this.props.loadMovieDetail(option.props.params.id);
        }
    }

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        MovieDetail.loadData.call(this, {props: this.props});
    }

    render() {
        const {
            title,
            original_title,
            year,
            images,
            directors,
            casts,
            genres,
            countries,
            aka,
            rating,
            ratings_count,
            summary,
            id,
            isLoading
        } = this.props.movieDetail;

        const directorsStr = directors && directors.map(el => el.name).join('/');
        const castsStr = casts && casts.map(el => el.name).join('/');
        const genresStr = genres && genres.join('/');
        const countriesStr = countries && countries.join('/');
        const akaStr = aka && aka.join('/');

        const isChanging = isLoading || id !== this.props.params.id;

        return (
            <div className="movie_detail">
                {isChanging && Loading()}
                {!isChanging && 
                <div className="article">
                    <Link to="/">返回</Link>
                    <h1><span>{title} {original_title}</span><span className="year">({year})</span></h1>
                    <div className="subject clearfix">
                        <div id="mainpic" className="">
                            <img src={images && images.medium} alt={original_title} />
                        </div>
                        <div id="info">
                            <span>
                                <span className="pl">导演:</span>
                                <span>{directorsStr}</span>
                            </span>
                            <br />
                            <span className="actor">
                            <span className="pl">主演</span>:<span>{castsStr}</span>
                            </span>
                            <br />
                            <span className="pl">类型:</span>
                            <span property="v:genre">{genresStr}</span>
                             <br />
                             <span className="pl">制片国家/地区:</span> {countriesStr}
                             <br />
                             <span className="pl">又名:</span> {akaStr}
                             <br />
                             <span className="pl">豆瓣评分:</span> {rating && rating.average}
                             <br />
                             <span className="pl">评分人数:</span>{ratings_count}
                        </div>
                    </div>
                    <div className="related-info">
                        <h2>{title}的剧情简介&nbsp;&nbsp;·&nbsp;&nbsp;·&nbsp;&nbsp;·&nbsp;&nbsp;·&nbsp;&nbsp;·&nbsp;&nbsp;·</h2>
                        <div className="indent" id="link-report">
                            <span>
                                {summary}　　
                            </span>
                        </div>
                    </div>
                </div>
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { movieDetail } = state;
    return {
        movieDetail,
    };
}

export default connect(mapStateToProps, {
    loadMovieDetail,
})(MovieDetail);
