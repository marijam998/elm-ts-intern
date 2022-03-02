import { Html } from 'elm-ts/lib/React';
import * as Cmd from 'elm-ts/lib/Cmd'

// --- Model
export type Model = {
    name: string,
    surname: string,
    city: string,
    number: number,
}

export const init: [Model, Cmd.Cmd<Msg>] = [{ name: '', surname: '', city: '', number: 0, }, Cmd.none]

// --- Messages
export type Msg = { type: 'OnChangeName', value: string } | { type: 'OnChangeSurname', value: string } | { type: 'OnChangeCity', value: string } | { type: 'OnChangeNumber', value: number }

// --- Update
export const update = (msg: Msg, model: Model): [Model, Cmd.Cmd<Msg>] => {
    switch (msg.type) {
        case 'OnChangeName':
            return [{ ...model, name: msg.value }, Cmd.none]
        case 'OnChangeSurname':
            return [{ ...model, surname: msg.value }, Cmd.none]
        case 'OnChangeCity':
            return [{ ...model, city: msg.value }, Cmd.none]
        case 'OnChangeNumber':
            return [{ ...model, number: msg.value }, Cmd.none]
    }
}

// --- View
export const view = (model: Model): Html<Msg> => {
    return dispatch => (
        <div>
            <input value={model.name} type='text' onChange={(e) => dispatch({ type: 'OnChangeName', value: e.target.value })} />
            <input value={model.surname} type='text' onChange={(e) => dispatch({ type: 'OnChangeSurname', value: e.target.value })} />
            <input value={model.city} type='text' onChange={(e) => dispatch({ type: 'OnChangeCity', value: e.target.value })} />
            <input value={model.number} type='number' onChange={(e) => dispatch({ type: 'OnChangeNumber', value: Number(e.target.value) })} />
        </div>
    )
}