(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['filmSelection.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "\n    <div class=\"filmSelection_film\">\n      <img class=\"filmSelection_film_poster\" src=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"poster_href") || (depth0 != null ? lookupProperty(depth0,"poster_href") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"poster_href","hash":{},"data":data,"loc":{"start":{"line":10,"column":50},"end":{"line":10,"column":65}}}) : helper)))
    + "\" />\n      <p class=\"filmSelection_film_name\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":11,"column":41},"end":{"line":11,"column":49}}}) : helper)))
    + "</p>\n      <div class=\"filmSelection_film_rating\">\n        <img class=\"filmSelection_film_rating_img\" src=\"../../icons/star.svg\" />\n        <p class=\"filmSelection_film_rating_p\">\n          "
    + alias4(((helper = (helper = lookupProperty(helpers,"rating") || (depth0 != null ? lookupProperty(depth0,"rating") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"rating","hash":{},"data":data,"loc":{"start":{"line":15,"column":10},"end":{"line":15,"column":20}}}) : helper)))
    + "\n        </p>\n      </div>\n      <div class=\"filmSelection_film_select\">\n        <img class=\"filmSelection_film_select_img\" src=\"../../icons/plus.svg\" />\n        <p class=\"filmSelection_film_select_p\">\n          К просмотру\n        </p>\n      </div>\n\n    </div>\n\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"filmSelection_name\">\n  "
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"collection") : depth0)) != null ? lookupProperty(stack1,"collectionName") : stack1), depth0))
    + "\n</div>\n<div class=\"filmSelection_films\">\n\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? lookupProperty(depth0,"collection") : depth0)) != null ? lookupProperty(stack1,"films") : stack1),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":7,"column":2},"end":{"line":27,"column":11}}})) != null ? stack1 : "")
    + "\n</div>\n";
},"useData":true});
})();