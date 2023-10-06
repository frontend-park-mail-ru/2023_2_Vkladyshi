import {Component} from '../component.js';

export class Signin extends Component{
    constructor() {
        super();
    }

    render() {
        return Handlebars.templates['signin.hbs']();
    }
}
