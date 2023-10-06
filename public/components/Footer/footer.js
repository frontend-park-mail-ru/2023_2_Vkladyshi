import {Component} from '../component.js';

export class Footer extends Component{
    constructor() {
        super()
    }

    render() {
        return Handlebars.templates['footer.hbs']();
    }
}

