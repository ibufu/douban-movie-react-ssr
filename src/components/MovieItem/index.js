import React from 'react';
import { Link } from 'react-router';
import './MovieItem.css';

export default class MovieItem extends React.PureComponent {
    render() {
        const {
            rank,
            images,
            title,
            original_title,
            directors,
            casts,
            year,
            genres,
            rating,
            id,
        } = this.props.movie;

        return (
            <div className="item">
                <div className="pic">
                    <em>{rank}</em>
                    <Link to={`/movie/${id}`}>
                        <img src={images.small} />
                    </Link>
                </div>
                <div className="info">
                    <div className="hd">
                        <Link to={`/movie/${id}`}>
                            <span className="title">{title}</span>
                            <span className="title">&nbsp;/&nbsp;{original_title}</span>
                        </Link>
                    </div>
                    <div className="bd">
                        <p className="">
                            导演: {directors[0].name}&nbsp;&nbsp;&nbsp;主演: {casts[0].name} /...<br/>
                            {year}&nbsp;/&nbsp;&nbsp;/&nbsp;{genres.join(' ')}
                        </p>   
                        <div className="star">
                                <span className="rating5-t"></span>
                                <span className="rating_num" property="v:average">{rating.average}</span>
                                <span property="v:best" content="10.0"></span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}