import {dispatchAction, getRoute, getView, renderView, routes} from "./core/router";

import express from 'express';

const app = express();

const filteredPaths = ['/favicon.ico'];

app.use('/assets', express.static('assets'));


app.get("*", function(request, response){
    if(filteredPaths.includes(request.path)){
        response.send('');
    }else {
        const view = routes[request.path] && getRoute(request.path) && getView(getRoute(request.path));

        if(view){
            response.send(renderView(view, dispatchAction(request.path)))
        }else {
            response.redirect('/404')
        }
    }
});

app.listen(3000);