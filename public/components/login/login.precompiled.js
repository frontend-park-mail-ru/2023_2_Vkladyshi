(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['login.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<form class=\"login_form\">\n    <input class=\"login_input\" placeholder=\"login\">\n    <input class=\"password_input\" placeholder=\"password\">\n    <button class=\"button_login\" type=\"submit\">Войти</button>\n</form>\n";
},"useData":true});
})();