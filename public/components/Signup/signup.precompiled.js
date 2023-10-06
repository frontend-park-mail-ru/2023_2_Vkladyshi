(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['signup.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"signupBox\">\n  <form class=\"signupForm\">\n    <input class=\"loginInputSignup\" placeholder=\"Логин\" />\n    <input class=\"emailInput\" placeholder=\"Электронная почта\" />\n    <input class=\"passwordInputFirst\" type=\"password\" placeholder=\"Пароль\" />\n    <input class=\"passwordInputSecond\" type=\"password\" placeholder=\"Пароль\" />\n    <button class=\"signupButton\" type=\"submit\">Войти</button>\n  </form>\n  <div class=\"redirectToSignin\" data-section=\"signin\">\n    Вы уже зарегистрированы ?\n  </div>\n  <div class=\"errorString\"></div>\n</div>";
},"useData":true});
})();