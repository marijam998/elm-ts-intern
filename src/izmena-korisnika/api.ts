import * as io from 'io-ts'
import { none } from 'fp-ts/lib/Option'
import { Request, expectJson, get, post } from 'elm-ts/lib/Http'
import { fromType } from 'elm-ts/lib/Decode'
import { type } from 'os'

const apiFetchUser = 'http://localhost:3001/person/1'
const apiUpdateUser = 'http://localhost:3001/person/1'

const ioKorisnikCmd = io.interface({
    name: io.string,
    sureName: io.string,
    userType: io.string,
    date: io.union([io.string, io.null]),
    city: io.string,
    adress: io.string
})

export type KorisnikCmd = io.TypeOf<typeof ioKorisnikCmd>
export type KorisnikResponse = io.TypeOf<typeof ioKorisnikCmd>


export const fetchUser = (): Request<KorisnikResponse> => {
    return get(apiFetchUser, fromType(ioKorisnikCmd))
}

export const saveEdit = (korisnik: KorisnikCmd): Request<KorisnikResponse> => {
    return {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        url: apiFetchUser,
        body: korisnik,
        expect: expectJson(fromType(ioKorisnikCmd)),
        timeout: none,
        withCredentials: false,
    }
}
