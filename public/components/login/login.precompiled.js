(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['login.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<form class=\"loginForm\">\n    <input class=\"loginInput\" placeholder=\"login\">\n    <input class=\"passwordInput\" type=\"password\" placeholder=\"password\">\n    <button class=\"buttonLogin\" type=\"submit\">Войти</button>\n</form>\n<div class=\"redirectToSignup\" data-section=\"signup\">\n    Вы ещё не зарегистрированы ?\n</div>\n";
},"useData":true});
})();