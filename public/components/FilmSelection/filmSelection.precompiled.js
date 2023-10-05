(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['filmSelection.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "      <div class=\"filmSelection_film\">\n        <img class=\"filmSelection_film_poster\" src=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"poster_href") || (depth0 != null ? lookupProperty(depth0,"poster_href") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"poster_href","hash":{},"data":data,"loc":{"start":{"line":8,"column":52},"end":{"line":8,"column":67}}}) : helper)))
    + "\" />\n        <p class=\"filmSelection_film_name\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":9,"column":43},"end":{"line":9,"column":51}}}) : helper)))
    + "</p>\n        <div class=\"filmSelection_film_rating\">\n          <img\n            class=\"filmSelection_film_rating_img\"\n            src=\"../../icons/star.svg\"\n          />\n          <p class=\"filmSelection_film_rating_p\">\n            "
    + alias4(((helper = (helper = lookupProperty(helpers,"rating") || (depth0 != null ? lookupProperty(depth0,"rating") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"rating","hash":{},"data":data,"loc":{"start":{"line":16,"column":12},"end":{"line":16,"column":22}}}) : helper)))
    + "\n          </p>\n        </div>\n        <div class=\"filmSelection_film_select\">\n          <img\n            class=\"filmSelection_film_select_img\"\n            src=\"../../icons/plus.svg\"\n          />\n          <p class=\"filmSelection_film_select_p\">\n            К просмотру\n          </p>\n        </div>\n      </div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"filmSelection\">\n  <div class=\"filmSelection_name\">\n    "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"collection_name") || (depth0 != null ? lookupProperty(depth0,"collection_name") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"collection_name","hash":{},"data":data,"loc":{"start":{"line":3,"column":4},"end":{"line":3,"column":23}}}) : helper)))
    + "\n  </div>\n  <div class=\"filmSelection_films\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"films") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":6,"column":4},"end":{"line":29,"column":13}}})) != null ? stack1 : "")
    + "  </div>\n</div>\n";
},"useData":true});
})();