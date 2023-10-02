(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['signup.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<form class=\"signupForm\">\n    <input class=\"loginInput\" placeholder=\"login\">\n    <input class=\"emailInput\" placeholder=\"email\">\n    <input class=\"passwordInputFirst\" type=\"password\" placeholder=\"password\">\n    <input class=\"passwordInputSecond\" type=\"password\" placeholder=\"password\">\n    <button class=\"signupButton\" type=\"submit\">Войти</button>\n</form>\n<div class=\"redirectToLogin\" data-section=\"login\">\n    Вы уже зарегистрированы ?\n</div>\n";
},"useData":true});
})();