import {Component} from '../component.js';

export class Footer extends Component{
    constructor() {
        super()

        this.state = {
        }
    }

    render() {
        return Handlebars.templates['footer.hbs']();
    }
}

