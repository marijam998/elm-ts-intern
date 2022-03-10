import { Html } from 'elm-ts/lib/React';
import * as Cmd from 'elm-ts/lib/Cmd';
import { Either } from 'fp-ts/lib/Either'
import { TextField, DefaultButton } from '@fluentui/react';
import { send, HttpError } from 'elm-ts/lib/Http'
import { kreirajKorisnik, KreiranjeResponse, KreirajKorisnikCmd as Form } from './api'
import Loading from './loading';

// --- Model

export type Model = {
    form: Form
    isLoading: boolean,
}

const initialFormValue: Form = {
    name: '',
    sureName: '',
    userType: '',
    date: null,
    city: '',
    adress: '',
}

export const init: [Model, Cmd.Cmd<Msg>] = [{ form: initialFormValue, isLoading: false }, Cmd.none]

// --- Messages
export type Msg = { type: 'StartKreirajKorisnik' }
    | { type: 'ChangeName', value: string }
    | { type: 'ChangeSureName', value: string }
    | { type: 'ChangeUserType', value: string }
    | { type: 'ChangeDate', value: string }
    | { type: 'ChangeCity', value: string }
    | { type: 'ChangeAdress', value: string }
    | { type: 'Saved', value: Either<HttpError, KreiranjeResponse> }

// --- Update
export const update = (msg: Msg, model: Model): [Model, Cmd.Cmd<Msg>] => {
    switch (msg.type) {
        case 'StartKreirajKorisnik': {
            console.log(model)
            const { form } = model
            return [{ ...model, isLoading: true }, send(kreirajKorisnik(form), response => ({ type: 'Saved', value: response }))]
        }
        case 'ChangeName':
            return [{ ...model, form: { ...model.form, name: msg.value } }, Cmd.none]
        case 'ChangeSureName':
            return [{ ...model, form: { ...model.form, sureName: msg.value } }, Cmd.none]
        case 'ChangeUserType':
            return [{ ...model, form: { ...model.form, userType: msg.value } }, Cmd.none]
        case 'ChangeDate':
            return [{ ...model, form: { ...model.form, date: msg.value } }, Cmd.none]
        case 'ChangeCity':
            return [{ ...model, form: { ...model.form, city: msg.value } }, Cmd.none]
        case 'ChangeAdress':
            return [{ ...model, form: { ...model.form, adress: msg.value } }, Cmd.none]
        case 'Saved': {
            return msg.value.fold((error) => {
                console.log(error)
                return [{ ...model, isLoading: false }, Cmd.none]
            }, response => {
                console.log('Uspesno kreiran korisnik pod ID: ', response.id)
                return [{ ...model, form: initialFormValue, isLoading: false }, Cmd.none]
            })
        }
    }
}

// --- View
export const view = (model: Model): Html<Msg> => {
    const { form } = model
    return dispatch => (
        <div className='app'>{
            !model.isLoading ?
                <div>
                    <TextField className='textFieldGif' label='Ime' value={form.name} onChange={(_, newValue) => dispatch({ type: 'ChangeName', value: newValue || '' })} />
                    <TextField className='textFieldGif' label='Prezime' value={form.sureName} onChange={(_, newValue) => dispatch({ type: 'ChangeSureName', value: newValue || '' })} />
                    <TextField className='textFieldGif' label='Zanimanje' value={form.userType} onChange={(_, newValue) => dispatch({ type: 'ChangeUserType', value: newValue || '' })} />
                    <TextField className='textFieldGif' label='Datum' value={form.date || ''} onChange={(_, newValue) => dispatch({ type: 'ChangeDate', value: newValue || '' })} />
                    <TextField className='textFieldGif' label='Grad' value={form.city} onChange={(_, newValue) => dispatch({ type: 'ChangeCity', value: newValue || '' })} />
                    <TextField className='textFieldGif' label='Adresa' value={form.adress} onChange={(_, newValue) => dispatch({ type: 'ChangeAdress', value: newValue || '' })} />
                    <DefaultButton className='gifSearchButton' text='Dodaj korisnika' onClick={() => dispatch({ type: 'StartKreirajKorisnik' })} />
                </div> :
                <Loading />
        }
        </div>

    )
}