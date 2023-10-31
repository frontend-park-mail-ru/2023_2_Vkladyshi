#!/bin/bash

# Массив с путями к шаблонам Handlebars
# templates=(
#   "public/components/contentBlock/contentBlock.hbs"
#   "public/components/header/header.hbs"
#   "public/components/signup/signup.hbs"
#   "public/components/footer/footer.hbs"
#   "public/components/filmSelection/filmSelection.hbs"
# )

mapfile -t templates <<< "$(ls -R ./public/components/*/*.hbs)"

# # Выводим элементы массива
# for element in "${templates[@]}"; do
#   echo "$element"
# done

# Перебираем каждый путь к шаблону
for template in "${templates[@]}"; do
  # Генерируем путь к файлу с предкомпилированным шаблоном
  compiled_file="${template%.*}.precompiled.js"

  # Компилируем шаблон с помощью Handlebars
  npx handlebars $template -f $compiled_file
#   echo $template
#   echo $compiled_file
#   echo =============
done
