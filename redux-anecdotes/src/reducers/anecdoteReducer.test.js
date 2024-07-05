import deepFreeze from "deep-freeze";
import anecdoteReducer from "./anecdoteReducer";

describe("anecdoteReducer", () => {
  test("returns new state with action VOTE", () => {
    const state = [
      { content: "State is in the store", id: 1, votes: 0 },
      { content: "Eat sleep react", id: 2, votes: 10 },
    ];

    const action = {
      type: "VOTE",
      payload: { id: 1 },
    };

    deepFreeze(state);
    const newState = anecdoteReducer(state, action);

    expect(newState).toHaveLength(2);
    expect(newState).toContainEqual({
      content: "State is in the store",
      id: 1,
      votes: 1,
    });
  });

  test("returns new state with action ADD_ANECDOTE", () => {
    const state = [];
    const action = {
      type: "ADD_ANECDOTE",
      payload: {
        content: "Eat sleep react",
        id: 1,
        votes: 0,
      },
    };

    deepFreeze(state);
    const newState = anecdoteReducer(state, action);

    expect(newState).toHaveLength(1);
    expect(newState).toContainEqual(action.payload);
  });
});
