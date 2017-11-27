import { createStore } from 'redux';

let ACTIONS = {
  SET_HOVERING_STATE: ({ foo, ...state }, { text }) => ({
    foo: [...foo, {
      text
    }]
  })
}

const INITIAL = {
  foo: ['something']
}

export default createStore((state, action) => (
  // console.log(ACTIONS[action.type](state, action))
  console.log(state)
), INITIAL);