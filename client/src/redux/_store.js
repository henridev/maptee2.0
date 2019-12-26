import { createStore } from 'redux'
import app from './_reducers'

export const store = createStore(app)

export const startState = store.getState()
