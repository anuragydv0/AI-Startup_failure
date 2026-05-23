"use client"

import { useSyncExternalStore } from "react"

interface UIState {
  roastModeEnabled: boolean
}

type Listener = () => void

let state: UIState = {
  roastModeEnabled: false,
}

const listeners = new Set<Listener>()

function emitChange() {
  listeners.forEach((listener) => listener())
}

function setState(updater: (current: UIState) => UIState) {
  state = updater(state)
  emitChange()
}

function subscribe(listener: Listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function getState() {
  return state
}

export function useUIStore<T>(selector: (value: UIState) => T): T {
  return useSyncExternalStore(
    subscribe,
    () => selector(getState()),
    () => selector(getState())
  )
}

export function toggleRoastMode() {
  setState((current) => ({ ...current, roastModeEnabled: !current.roastModeEnabled }))
}
