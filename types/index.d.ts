declare module '*.svg?inline' {
  import {ReactComponentElement} from 'react';
  const content: ReactComponentElement<SVGElement>
  export default ReactComponentElement<SVGElement>
}
