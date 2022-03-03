import { Html } from 'elm-ts/lib/React';
import * as Cmd from 'elm-ts/lib/Cmd';
import { Either } from 'fp-ts/lib/Either'
import { TextField, DefaultButton } from '@fluentui/react';
import { send, HttpError } from 'elm-ts/lib/Http'
import { fetchGif, ApiGif } from './api'

const TOPIC = 'CAT'

// --- Model
export type Model = {
    data: ApiGif | null,
    topic: string
}

export const init: [Model, Cmd.Cmd<Msg>] = [{ data: null, topic: '' }, send(fetchGif(TOPIC), response => ({ type: 'FetchGif', data: response }))]

// --- Messages
export type Msg = { type: 'FetchGif', data: Either<HttpError, ApiGif> } | { type: 'OnChangeTopic', value: string } | { type: 'StartFetch' }

// --- Update
export const update = (msg: Msg, model: Model): [Model, Cmd.Cmd<Msg>] => {
    switch (msg.type) {
        case 'StartFetch':
            return [model, send(fetchGif(model.topic), response => ({ type: 'FetchGif', data: response }))]
        case 'FetchGif': {
            return msg.data.fold(error => {
                console.log(error)
                return [model, Cmd.none]
            }, data => [{ ...model, data }, Cmd.none])
        }
        case 'OnChangeTopic':
            return [{ ...model, topic: msg.value }, Cmd.none]
    }
}

// --- View
export const view = (model: Model): Html<Msg> => {
    return dispatch => (
        <div className='app'>
            <TextField className='textFieldGif' value={model.topic} onChange={(_, newValue) => dispatch({ type: 'OnChangeTopic', value: newValue || '' })} />
            <DefaultButton className='gifSearchButton' iconProps={{ iconName: 'Search' }} text='Search' onClick={() => dispatch({ type: 'StartFetch' })} />
            {model.data && <img src={model.data.data.images.downsized.url} width="300px" height="300px" />}
        </div>
    )
}