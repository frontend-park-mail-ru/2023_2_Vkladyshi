import {Component} from '../component.js';

export class ContentBlock extends Component{
    constructor() {
        super();
    }

    render() {
        return Handlebars.templates['contentBlock.hbs']();
    }
}
