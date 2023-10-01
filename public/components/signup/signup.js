(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['signup.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<form class=\"signupForm\">\n    <input class=\"loginInput\" placeholder=\"login\">\n    <input class=\"emailInput\" placeholder=\"email\">\n    <input class=\"passwordInputFirst\" placeholder=\"password\">\n    <input class=\"passwordInputSecond\" placeholder=\"password\">\n    <button class=\"signupButton\" type=\"submit\">Войти</button>\n</form>\n";
},"useData":true});
})();