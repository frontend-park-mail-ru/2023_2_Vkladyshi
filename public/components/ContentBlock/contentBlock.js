import {Component} from '../component.js';

export class ContentBlock extends Component{
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return Handlebars.templates['contentBlock.hbs']();
    }
}
