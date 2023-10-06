import {
  errorInputs,
  header,
  responseStatuses,
  ROOT,
  urls,
} from '../../utils/config.js';
import { validateEmail, validatePassword } from "../../utils/validate.js";
import { returnError } from "../../utils/addError.js";
import { goToPageByEvent } from "../../utils/goToPage.js";
import { post } from "../../utils/ajax.js";
import { Component } from '../component.js';
import {Signin} from '../Signin/signin.js';

export class Signup extends Component{
    constructor() {
      super();
    }
    render() {
      return Handlebars.templates['signup.hbs']();
    }

}
