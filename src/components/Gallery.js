import React, { Component } from 'react';
import axios from "axios";
import Masonry from 'react-masonry-css'
import { Link } from "react-router-dom";

import './mosaic.css';

class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gallery: [],
            page: 1,
            loading: false,
            prevY: 0
        };
    }

    componentDidMount() {
        this.getGallery(this.state.page);

        // Options
        var options = {
            root: null, // Page as root
            rootMargin: "0px",
            threshold: 1.0
        };
        // Create an observer
        this.observer = new IntersectionObserver(
            this.handleObserver.bind(this), //callback
            options
        );
        //Observ the `loadingRef`
        this.observer.observe(this.loadingRef);
    }

    handleObserver(entities, observer) {
        const y = entities[0].boundingClientRect.y;
        if (this.state.prevY > y) {
            const curPage = this.state.page + 1;
            this.getGallery(curPage);
            this.setState({ page: curPage });
        }
        this.setState({ prevY: y });
    }

    getGallery(page) {
        this.setState({ loading: true });
        axios
            .get(`https://pixabay.com/api/?key=8506502-fd530cf53ce4c9ff2733ae363&media_type=photo&page=${page}&per_page=100`)
            .then(res => {
                console.log(res.data.hits)
                this.setState({ gallery: [...this.state.gallery, ...res.data.hits] });
                this.setState({ loading: false });
            });

        console.log(this.state.gallery)
    }

    render() {

        const loadingCSS = {
            height: "100px",
            margin: "30px"
        };

        const loadingTextCSS = {
            display: this.state.loading ? "block" : "none"
        };

        const breakpointColumnsObj = {
            default: 4,
            1100: 3,
            700: 2,
            500: 1
        };

        return (
            <div>
                <div style={{ minHeight: "800px" }}>
                    <Masonry breakpointCols={breakpointColumnsObj}>

                        {this.state.gallery.map(image => 
                            <Link key={image.id}
                            className="imgContainer"
                            to={{
                                pathname: `/img/${image.id}`,
                                params: {imageId: `${image.id}`, imageURL: `${image.webformatURL}`}

                            }} >
                                <img key={image.id} src={image.webformatURL} alt={image.id} />
                            </Link>
                        )}

                    </Masonry>
                </div>
                <div ref={loadingRef => (this.loadingRef = loadingRef)} style={loadingCSS}>
                    <span style={loadingTextCSS}>Loading...</span>
                </div>
            </div>
        );

    }

}

export default Gallery;
