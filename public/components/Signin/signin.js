import {Component} from '../component.js';

export class Signin extends Component{
    constructor() {
        super();

        this.state = {}
    }

    render() {
        return Handlebars.templates['signin.hbs']();
    }
}
