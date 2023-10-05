(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['header.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <div>\n                <nav class=\"navigationProfile\" role=\"navigation\">\n                    <ul class=\"ulNavProfile\">\n                        <li class=\"liNavProfile\">\n                            <div class=\"headerItem\">\n                                <img src=\"../../icons/"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"profile") : depth0)) != null ? lookupProperty(stack1,"png_name") : stack1), depth0))
    + "\" class=\"icon\">\n                                <span>"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"profile") : depth0)) != null ? lookupProperty(stack1,"name") : stack1), depth0))
    + "</span>\n                            </div>\n                            <ul class=\"dropdown\">\n                                <li class=\"settingsHeader\" data-section=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"profile") : depth0)) != null ? lookupProperty(stack1,"key") : stack1), depth0))
    + "\">Настройки</li>\n                                <li class=\"logoutHeader\">Выйти</li>\n                            </ul>\n                        </li>\n                    </ul>\n                </nav>\n            </div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <div class=\"loginHeader\" data-section=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"signin") : depth0)) != null ? lookupProperty(stack1,"key") : stack1), depth0))
    + "\">\n                <img src=\"../../icons/"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"signin") : depth0)) != null ? lookupProperty(stack1,"png_name") : stack1), depth0))
    + "\" class=\"icon\" alt=\"\">\n                <span class=\"loginText\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"signin") : depth0)) != null ? lookupProperty(stack1,"name") : stack1), depth0))
    + "</span>\n            </div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<header>\n    <div class=\"header\">\n        <div class=\"brandHeader\" data-section=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"brand") : depth0)) != null ? lookupProperty(stack1,"key") : stack1), depth0))
    + "\">\n            <img src=\"../../icons/"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"brand") : depth0)) != null ? lookupProperty(stack1,"png_name") : stack1), depth0))
    + "\" class=\"brand_icon\">\n            <span>"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"brand") : depth0)) != null ? lookupProperty(stack1,"name") : stack1), depth0))
    + "</span>\n        </div>\n\n        <div class=\"menuHeader\" data-section=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"selection") : depth0)) != null ? lookupProperty(stack1,"key") : stack1), depth0))
    + "\">\n            <img src=\"../../icons/"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"selection") : depth0)) != null ? lookupProperty(stack1,"png_name") : stack1), depth0))
    + "\" class=\"icon\">\n            <span>"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"selection") : depth0)) != null ? lookupProperty(stack1,"name") : stack1), depth0))
    + "</span>\n        </div>\n\n        <input class=\"header_search_item\" placeholder=\"Поиск фильмов\">\n\n        <div class=\"headerItem\" data-section=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"basket") : depth0)) != null ? lookupProperty(stack1,"key") : stack1), depth0))
    + "\">\n            <img src=\"../../icons/"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"basket") : depth0)) != null ? lookupProperty(stack1,"png_name") : stack1), depth0))
    + "\" class=\"icon\">\n            <span>"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"basket") : depth0)) != null ? lookupProperty(stack1,"name") : stack1), depth0))
    + "</span>\n        </div>\n\n"
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"isAuthorized") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":20,"column":8},"end":{"line":42,"column":15}}})) != null ? stack1 : "")
    + "    </div>\n</header>\n\n\n\n\n\n";
},"useData":true});
})();