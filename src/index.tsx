import * as ElmReact from 'elm-ts/lib/React';
import { render } from 'react-dom';
import * as Main from './kockice';

const main = ElmReact.program(Main.init, Main.update, Main.view)
ElmReact.run(main, dom => render(dom, document.getElementById('root')!))