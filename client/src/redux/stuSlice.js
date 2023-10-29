import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {getStuListApi, deleteStuByIdApi, addStuApi, editStuByIdApi} from "../api/stuApi";

export const getStuListAsync = createAsyncThunk(
    'stu/getStuListAsync',
    async (_, thunkAPI) => {
        const response = await getStuListApi();
        thunkAPI.dispatch(initStuList(response.data));
    }
);

export const addStuAsync = createAsyncThunk(
    'stu/addStuAsync',
    async (payload, thunkAPI) => {

        const {data} = await addStuApi(payload);
        thunkAPI.dispatch(addStu(data));
    }
);

export const deleteStuByIdAsync = createAsyncThunk(
    'stu/delStuAsync',
    async (payload, thunkAPI) => {
        deleteStuByIdApi(payload);
        thunkAPI.dispatch(delStuApi(payload));
    }
);

export const editStuByIdAsync = createAsyncThunk(
    'stu/editStuByIdAsync',
    async (payload, thunkAPI) => {
        editStuByIdApi(payload.id, payload.stu);
        thunkAPI.dispatch(editStu(payload));
    }
);

export const stuSlice = createSlice({
    name: 'stu',
    initialState: {
        stuList: []
    },
    reducers: {
        //初始化学生列表到仓库的stuList里面
        initStuList: (state, {payload}) => {
            state.stuList = payload;
        },
        delStuApi: (state, {payload}) => {
            for (let i = 0; i < state.stuList.length; i++) {
                if (state.stuList[i].id === ~~payload) {
                    state.stuList.splice(i, 1);
                    break;
                }
            }
        },
        addStu: (state, {payload}) => {
            state.stuList.push(payload);
        },
        editStu: (state, {payload}) => {
            for (let i = 0; i < state.stuList.length; i++) {
                if (state.stuList[i].id === ~~payload.id) {
                    state.stuList.splice(i, 1, payload.stu);
                    break;
                }
            }
        }
    }
});

const {initStuList, delStuApi, addStu, editStu} = stuSlice.actions;
export default stuSlice.reducer;
