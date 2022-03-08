const path = require('path');
const fs = require("fs-extra");

const src = path.join('src', 'extraResources', 'preload');
const dest = path.join('extraResources/preload/');

fs.copy(src, dest, function (err) {
    if (err) {
        console.log('An error occurred while copying assets folder.', err);
        return console.error(err)
    }
    console.info('Copied preload folder');
});