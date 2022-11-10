import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

export const fetchComments = createAsyncThunk(
    "comments/fetchComments",
    async (id) => {
        const { data } = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
        const commentsIds = data.kids;
        const links = commentsIds.map(id => axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`));
        return (await Promise.all(links)).map(({ data }) => data)
    }
)

export const fetchCommentAnswers = createAsyncThunk(
    "comments/fetchCommentAnswers",
    async (params) => {
        const { kids, id } = params;
        const result = [];
        const bypassChild = async (kids) => {
            for (let i = 0; i < kids.length; i++) {
                const { data } = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${kids[i]}.json`);
                if (data.kids) {
                    result.push(data)
                    await bypassChild(data.kids)
                } else {
                    result.push(data)
                }
            }
        }
        await bypassChild(kids);
        return { id: id, result }
    }
)


const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        comments: [],
        childComments: {},
        statusComments: "loading",
        statusChildComments: "success",
    },
    reducers: {},
    extraReducers: {
        [fetchComments.pending]: (state) => {
            state.comments = []
            state.statusComments = "loading"
        },
        [fetchComments.fulfilled]: (state, action) => {
            state.comments = action.payload
            state.statusComments = "success"
        },
        [fetchComments.rejected]: (state) => {
            state.comments = []
            state.statusComments = "error"
        },
        [fetchCommentAnswers.pending]: (state) => {
            state.statusChildComments = "loading"
        },
        [fetchCommentAnswers.fulfilled]: (state, action) => {
            state.childComments[action.payload.id] = action.payload.result;
            state.statusChildComments = "success"
        },
        [fetchCommentAnswers.rejected]: (state) => {
            state.statusChildComments = "error"
        },
    }
})

export default commentsSlice.reducer;