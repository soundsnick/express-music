import * as fs from 'fs';
import path from 'path';
import ejs from 'ejs';
import { indexAction } from '../controllers/applicationController';
import { loginAction, registerAction } from "../controllers/userController";
import { addAction } from "../controllers/trackController";

const routes = {
    '/': ['index', indexAction],
    '/login': ['login', loginAction],
    '/register': ['register', registerAction],
    '/add': ['addTrack', addAction],
    '/404': ['404']
};

const getRoute = (path) => routes[path][0];

const dispatchAction = (req, res) => routes[req.path][1] ? (routes[req.path][1])(req, res) : {};

const getView = (route) => fs.readFileSync(path.resolve(__dirname, `../views/${route}.ejs`), "utf-8");
const getTemplate = () => getView('template');

const renderView = (req, view, parameters = {}, globalParameters = { pageTitle: "Crossroad" }, template = getTemplate()) => {
    globalParameters.yield = ejs.render(view, parameters);
    if(parameters.pageTitle) globalParameters.pageTitle = parameters.pageTitle
    globalParameters.session = req.session;
    return ejs.render(template, globalParameters);
};

export { routes, getRoute, dispatchAction, getTemplate, getView, renderView };