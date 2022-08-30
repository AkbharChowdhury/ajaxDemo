import * as utils from './functions.js';

window.addEventListener('DOMContentLoaded', _ => {

    document.title = utils.pageTitle();
    utils.handleClick();
});