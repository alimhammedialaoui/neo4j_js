
    var _ = require('lodash');


    var Genre = module.exports = function (_node) {
      _.extend(this, _node.properties);
      if (this.id) { 
        this.id = this.id.toNumber();
      };
    };
    ;