import { Html } from 'elm-ts/lib/React';
import * as Cmd from 'elm-ts/lib/Cmd';
import { DefaultButton } from '@fluentui/react';
import { getRandomValue } from './randomvalueeffect';
import { getCurrentDate } from '../currentdate/currentdateeffect';

// --- Model
export type Model = {
    kockica1: number | null,
    kockica2: number | null,
    datum: Date | null
}

const batchDice = () => {
    return Cmd.batch<Msg>([
        getRandomValue(random => ({ type: 'DiceOne', value: random })),
        getRandomValue(random => ({ type: 'DiceTwo', value: random })),
        getCurrentDate(date => ({ type: 'CurrentDate', value: date }))
    ])
}

export const init: [Model, Cmd.Cmd<Msg>] = [{ kockica1: null, kockica2: null, datum: null }, batchDice()]

// --- Messages
export type Msg = { type: 'StartRandomValue' } | { type: 'DiceOne', value: number } | { type: 'DiceTwo', value: number } | { type: 'CurrentDate', value: Date }

// --- Update
export const update = (msg: Msg, model: Model): [Model, Cmd.Cmd<Msg>] => {
    switch (msg.type) {
        case 'StartRandomValue':
            return [model, batchDice()]
        case 'DiceOne':
            return [{ ...model, kockica1: msg.value }, Cmd.none]
        case 'DiceTwo':
            return [{ ...model, kockica2: msg.value }, Cmd.none]
        case 'CurrentDate':
            return [{ ...model, datum: msg.value }, Cmd.none]
    }
}

// --- View
export const view = (model: Model): Html<Msg> => {
    return dispatch => (
        <div>
            <h2>{model.kockica1}</h2>
            <h2>{model.kockica2}</h2>
            <h2>{JSON.stringify(model.datum, null, 2)}</h2>
            <DefaultButton text="Click" onClick={() => dispatch({ type: 'StartRandomValue' })} />
        </div >
    )
}