"use client";

import { useActionState } from "react";
import { registerUser } from "../actions/users";
import { initialRegisterFormState } from "../actions/form-states";

export default function RegisterPage() {
  const [state, formAction] = useActionState(
    registerUser,
    initialRegisterFormState,
  );

  return (
    <section className="mx-auto max-w-xl rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm">
      <div className="mb-6 grid gap-2">
        <h1 className="text-3xl font-black text-stone-900">Register</h1>
        <p className="text-stone-600">
          Create your own account to add blogs, generate API tokens, and manage
          a personal reading list.
        </p>
      </div>
      <form action={formAction} className="grid gap-4">
        <label className="grid gap-2">
          <span className="text-sm font-semibold text-stone-700">Username</span>
          <input
            name="username"
            type="text"
            required
            defaultValue={state.values.username}
            className="rounded-2xl border border-stone-300 bg-stone-50 px-4 py-3 outline-none transition focus:border-stone-500 focus:bg-white"
          />
          {state.errors.username && (
            <span className="text-sm font-semibold text-rose-700">
              {state.errors.username}
            </span>
          )}
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-semibold text-stone-700">Name</span>
          <input
            name="name"
            type="text"
            required
            defaultValue={state.values.name}
            className="rounded-2xl border border-stone-300 bg-stone-50 px-4 py-3 outline-none transition focus:border-stone-500 focus:bg-white"
          />
          {state.errors.name && (
            <span className="text-sm font-semibold text-rose-700">
              {state.errors.name}
            </span>
          )}
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-semibold text-stone-700">Password</span>
          <input
            name="password"
            type="password"
            required
            className="rounded-2xl border border-stone-300 bg-stone-50 px-4 py-3 outline-none transition focus:border-stone-500 focus:bg-white"
          />
          {state.errors.password && (
            <span className="text-sm font-semibold text-rose-700">
              {state.errors.password}
            </span>
          )}
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-semibold text-stone-700">
            Confirm password
          </span>
          <input
            name="passwordConfirm"
            type="password"
            required
            className="rounded-2xl border border-stone-300 bg-stone-50 px-4 py-3 outline-none transition focus:border-stone-500 focus:bg-white"
          />
          {state.errors.passwordConfirm && (
            <span className="text-sm font-semibold text-rose-700">
              {state.errors.passwordConfirm}
            </span>
          )}
        </label>
        <button
          type="submit"
          className="w-fit rounded-full bg-stone-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-stone-800"
        >
          Register
        </button>
      </form>
    </section>
  );
}
