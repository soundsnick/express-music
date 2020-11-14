import * as fs from 'fs';
import path from 'path';
import Mustache from 'mustache';
import { indexAction } from '../controllers/applicationController';

const routes = {
    '/': ['index', indexAction],
    '/404': ['404']
}

const getRoute = (path) => routes[path][0];

const dispatchAction = (path) => routes[path][1] ? (routes[path][1])() : {};

const getView = (route) => fs.readFileSync(path.resolve(__dirname, `../views/${route}.mustache`), "utf-8");
const getTemplate = () => getView('template');

const renderView = (view, parameters = {}, globalParameters = { pageTitle: "Crossroad" }, template = getTemplate()) => {
    globalParameters.yield = Mustache.render(view, parameters);
    return Mustache.render(template, globalParameters);
}

export { routes, getRoute, dispatchAction, getTemplate, getView, renderView }