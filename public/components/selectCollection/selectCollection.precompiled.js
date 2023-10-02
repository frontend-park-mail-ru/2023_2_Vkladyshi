(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['selectCollection.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "      <div class=\"selectCollection-frame-list\">\n        <p class=\"selectCollection-frame-list-header\"> "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"collection_name") || (depth0 != null ? lookupProperty(depth0,"collection_name") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"collection_name","hash":{},"data":data,"loc":{"start":{"line":9,"column":55},"end":{"line":9,"column":74}}}) : helper)))
    + "</p>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"collection_items") : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":10,"column":8},"end":{"line":12,"column":17}}})) != null ? stack1 : "")
    + "      </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "          <p class=\"selectCollection-frame-list-item\">"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</p>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"selectCollection-frame\">\n  <div class=\"selectCollection-frame-header\">\n    <img class=\"selectCollection-frame-img\" src=\"../../icons/arrow_left.svg\" />\n    <p class=\"selectCollection-frame-header-name\"> MovieGate</p>\n  </div>\n  <div class=\"selectCollection-frame-lists\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"collections") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":7,"column":4},"end":{"line":14,"column":13}}})) != null ? stack1 : "")
    + "  </div>\n</div>";
},"useData":true});
})();