import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import GalleryList from './Gallery'

class ModalSwitch extends React.Component {

    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={GalleryList} />
                    <Route path="/img/:id" component={ImageView} />
                </Switch>
            </div>
        );
    }
}

const ImageView = ({ match }) => {
    console.log( match )
    return (
        <div>
            <h1> id: {match.params.id} </h1>
        </div>
    );
};

const ModalGallery = () => (
    <Router>
        <Route component={ModalSwitch} />
    </Router>
);

export default ModalGallery;