import { Union, Record } from "./fable_modules/fable-library.4.9.0/Types.js";
import { union_type, record_type, list_type, string_type } from "./fable_modules/fable-library.4.9.0/Reflection.js";
import { ofArray, append, singleton } from "./fable_modules/fable-library.4.9.0/List.js";
import { createElement } from "react";
import { equals, createObj } from "./fable_modules/fable-library.4.9.0/Util.js";
import { join } from "./fable_modules/fable-library.4.9.0/String.js";
import { Interop_reactApi } from "./fable_modules/Feliz.2.7.0/Interop.fs.js";
import { map, delay, toList } from "./fable_modules/fable-library.4.9.0/Seq.js";
import { ProgramModule_mkSimple, ProgramModule_run } from "./fable_modules/Fable.Elmish.4.0.0/program.fs.js";
import { Program_withReactSynchronous } from "./fable_modules/Fable.Elmish.React.4.0.0/react.fs.js";

export class State extends Record {
    constructor(TodoList, NewTodo) {
        super();
        this.TodoList = TodoList;
        this.NewTodo = NewTodo;
    }
}

export function State_$reflection() {
    return record_type("App.State", [], State, () => [["TodoList", list_type(string_type)], ["NewTodo", string_type]]);
}

export class Msg extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["SetNewTodo", "AddNewTodo"];
    }
}

export function Msg_$reflection() {
    return union_type("App.Msg", [], Msg, () => [[["Item", string_type]], []]);
}

export function init() {
    return new State(singleton("Learn F#"), "");
}

export function update(msg, state) {
    if (msg.tag === 1) {
        if (state.NewTodo === "") {
            return state;
        }
        else {
            return new State(append(state.TodoList, singleton(state.NewTodo)), "");
        }
    }
    else {
        const desc = msg.fields[0];
        return new State(state.TodoList, desc);
    }
}

export function inputField(state, dispatch) {
    let elems_3, elems, value_3, elems_2, elems_1;
    return createElement("div", createObj(ofArray([["className", join(" ", ["field", "has-addons"])], (elems_3 = [createElement("div", createObj(ofArray([["className", join(" ", ["control", "is-expanded"])], (elems = [createElement("input", createObj(ofArray([["className", join(" ", ["input", "is-medium"])], (value_3 = state.NewTodo, ["ref", (e) => {
        if (!(e == null) && !equals(e.value, value_3)) {
            e.value = value_3;
        }
    }]), ["onChange", (ev) => {
        dispatch(new Msg(0, [ev.target.value]));
    }]])))], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])]))), createElement("div", createObj(ofArray([["className", "control"], (elems_2 = [createElement("button", createObj(ofArray([["className", join(" ", ["button", "is-primary", "is-medium"])], ["onClick", (_arg) => {
        dispatch(new Msg(1, []));
    }], (elems_1 = [createElement("i", {
        className: join(" ", ["fa", "fa-plus"]),
    })], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])])))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_2))])])))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_3))])])));
}

export function todoList(state, dispatch) {
    const children = toList(delay(() => map((todo) => createElement("li", {
        className: join(" ", ["box", "subtitle"]),
        children: todo,
    }), state.TodoList)));
    return createElement("ul", {
        children: Interop_reactApi.Children.toArray(Array.from(children)),
    });
}

export const appTitle = createElement("p", {
    className: "title",
    children: "Elmish To-Do List",
});

export function render(state, dispatch) {
    let elems;
    return createElement("div", createObj(ofArray([["style", {
        padding: 20,
    }], (elems = [appTitle, inputField(state, dispatch), todoList(state, dispatch)], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])));
}

ProgramModule_run(Program_withReactSynchronous("elmish-app", ProgramModule_mkSimple(init, update, render)));

//# sourceMappingURL=App.js.map
