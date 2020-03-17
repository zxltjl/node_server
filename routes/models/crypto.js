const crypto = require('crypto');
module.exports = {
    autograph:'new-system',
    md5:function(pass){
        const md5 = crypto.createHash('md5');
        md5.update(pass+this.autpgraph);
        const result = md5.digest('hex');
        return result;
    }
}