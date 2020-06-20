import { h, render } from 'preact';
import App from './js/components/App';
import './styles/global.sass';

function hydrate(vnode: string | number | boolean | object | null | undefined, parent: Element) {
  return render(vnode, parent, parent.firstElementChild as Element);
}

hydrate(<App />, document.getElementById('app') as Element);
