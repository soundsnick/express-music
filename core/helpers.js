import * as fs from 'fs';
import path from 'path';
import ejs from "ejs";

const getView = (route) => fs.readFileSync(path.resolve(__dirname, `../views/${route}.ejs`), "utf-8");

const getTemplate = () => getView('template');

const renderView = (req, view, parameters = {}, globalParameters = { pageTitle: "Crossroad" }, template = getTemplate()) => {
    globalParameters.yield = ejs.render(getView(view), parameters);
    if(parameters.pageTitle) globalParameters.pageTitle = parameters.pageTitle
    globalParameters.session = req.session;
    return ejs.render(template, globalParameters);
};

export { getView, getTemplate, renderView };