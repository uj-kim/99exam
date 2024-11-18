import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

/**
 * 2초 지연을 시키는 함수입니다 (비동기 작업).
 */
import { waitTwoSeconds } from '../../utils';

export const __addToDo = createAsyncThunk('__addToDo', async (payload, thunkAPI) => {
    try {
        await waitTwoSeconds();
        console.log('등록완료');
        return payload;
    } catch (err) {
        console.log('등록실패');
        return thunkAPI.rejectWithValue(err.message);
    }
});

export const __deleteTodo = createAsyncThunk('__deleteToDo', async (payload, thunkAPI) => {
    try {
        await waitTwoSeconds();
        console.log('삭제완료');
        return payload;
    } catch (err) {
        console.log('삭제실패');
        return thunkAPI.rejectWithValue(err.message);
    }
});

const initialState = {
    list: [],
};

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.list.push(action.payload);
        },
        deleteTodo: (state, action) => {
            state.list = state.list.filter((todo) => todo.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(__addToDo.fulfilled, (state, action) => {
                state.list.push(action.payload);
            })
            .addCase(__deleteTodo.fulfilled, (state, action) => {
                state.list = state.list.filter((todo) => todo.id !== action.payload);
            });
    },
});

export const { addTodo, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;
