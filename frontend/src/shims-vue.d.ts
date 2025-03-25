// Fixes Vue "Cannot find module..."  error
declare module '*.vue' {
  import type {DefineComponent} from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
