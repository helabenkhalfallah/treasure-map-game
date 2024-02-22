const fs = require('fs');
const husky = require('husky');

try {
    husky.install('./.husky')
    fs.unlinkSync('./.husky/_/.gitignore');
} catch(error){
    console.log('[Husky] set up husky failed : ', error);
}