import { Html } from 'elm-ts/lib/React';
import * as Cmd from 'elm-ts/lib/Cmd';
import { DefaultButton, PrimaryButton, TextField } from '@fluentui/react';

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
      return [{ ...model, counter: 0, name: '' }, Cmd.none]
    case 'OnChangeName':
      return [{ ...model, name: msg.value }, Cmd.none]
  }
}

// --- View
export const view = (model: Model): Html<Msg> => {
  return dispatch => (
    <div>
      Count: {model.counter}
      <DefaultButton text='+' onClick={() => dispatch({ type: 'Increment' })} />
      <DefaultButton text='-' onClick={() => dispatch({ type: 'Decrement' })} />
      <PrimaryButton text='Reset' onClick={() => dispatch({ type: 'Reset' })} />
      <TextField value={model.name} type='text' onChange={(_, newValue) => dispatch({ type: 'OnChangeName', value: newValue || '' })} />
    </div>
  )
}