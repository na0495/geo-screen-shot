# Installation for backend
[![Django CI](https://github.com/na0495/geo-craft/actions/workflows/django.yml/badge.svg)](https://github.com/na0495/geo-craft/actions/workflows/django.yml)

To get started first acces the virtual env with : 
macOs/Linux : `source env/bin/activate`, or windows : `.\env\Scripts\activate`.

if you don't have a virtual enviroment yet, you can create one with :

```sh
python -m venv env
``` 
unless you have a virtual enviroment already installed, for mac & linux use pyhton3.

then navigate the the root folder of django project and lunch the command : 
```sh
pip install -r requirements.txt / pip3 install -r requirements.txt
```
, and then 
```sh
python3 manage.py runserver / py manage.py runserver
```
to run the server locacly 

<!-- ## Contribute

Feel free to contribute to Crafting hub backend project, you can find the source code on [Github]


## License

coming soon ... -->
# Frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.1.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
