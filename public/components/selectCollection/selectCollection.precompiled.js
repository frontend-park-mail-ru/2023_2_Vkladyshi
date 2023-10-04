(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['selectCollection.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <div class=\"selectCollection-frame-list\">\n          <p class=\"selectCollection-frame-list-header\"> "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"collection_name") || (depth0 != null ? lookupProperty(depth0,"collection_name") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"collection_name","hash":{},"data":data,"loc":{"start":{"line":13,"column":57},"end":{"line":13,"column":76}}}) : helper)))
    + "</p>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"collection_items") : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":14,"column":10},"end":{"line":16,"column":19}}})) != null ? stack1 : "")
    + "        </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <p class=\"selectCollection-frame-list-item\" data-section=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"value") : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"key") : depth0), depth0))
    + "</p>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"selectCollection\">\n  <div class=\"selectCollection-frame\">\n    <div class=\"selectCollection-frame-header\">\n      <img\n        class=\"selectCollection-frame-img\"\n        src=\"../../icons/arrow_left.svg\"\n      />\n      <p class=\"selectCollection-frame-header-name\"> MovieGate</p>\n    </div>\n    <div class=\"selectCollection-frame-lists\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"collections") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":11,"column":6},"end":{"line":18,"column":15}}})) != null ? stack1 : "")
    + "    </div>\n  </div>\n</div>\n";
},"useData":true});
})();