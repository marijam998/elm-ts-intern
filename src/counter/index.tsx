import { Html } from 'elm-ts/lib/React';
import * as Cmd from 'elm-ts/lib/Cmd'

// --- Model
export type Model = {
  counter: number,
  name: string
}

export const init: [Model, Cmd.Cmd<Msg>] = [{ counter: 0, name: '' }, Cmd.none]

// --- Messages
export type Msg = { type: 'Increment' } | { type: 'Decrement' } | { type: 'Reset' } | { type: 'OnChangeName', value: string }

// --- Update
export const update = (msg: Msg, model: Model): [Model, Cmd.Cmd<Msg>] => {
  switch (msg.type) {
    case 'Increment':
      return [{ ...model, counter: model.counter + 1 }, Cmd.none]
    case 'Decrement':
      return [{ ...model, counter: model.counter - 1 }, Cmd.none]
    case 'Reset':
      return [{ ...model, counter: 0 }, Cmd.none]
    case 'OnChangeName':
      return [{ ...model, name: msg.value }, Cmd.none]
  }
}

// --- View
export const view = (model: Model): Html<Msg> => {
  return dispatch => (
    <div>
      Count: {model.counter}
      <button onClick={() => dispatch({ type: 'Increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'Decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'Reset' })}>Reset</button>
      <input value={model.name} type="text" onChange={(e) => dispatch({ type: 'OnChangeName', value: e.target.value })} />
    </div>
  )
}