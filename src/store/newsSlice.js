import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

export const fetchNews = createAsyncThunk(
    'news/fetchNews',
    async () => {
        const { data } = await axios.get("https://hacker-news.firebaseio.com/v0/newstories.json");
        const links = await data.slice(0, 100).map((id) => axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`));
        return (await Promise.all(links)).map(({ data }) => data)
    }
)

export const updateNews = createAsyncThunk(
    'news/updateNews',
    async () => {
        const { data } = await axios.get("https://hacker-news.firebaseio.com/v0/newstories.json");
        const links = await data.slice(0, 100).map((id) => axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`));
        return (await Promise.all(links)).map(({ data }) => data)
    }
)

export const fetchNewsById = createAsyncThunk(
    "news/fetchNewsById",
    async (newsId) => {
        const { data } = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${newsId}.json?descendants`)
        return data
    }
)



const newsSlice = createSlice({
    name: "news",
    initialState: {
        news: [],
        currentNews: [],
        status: "loading"
    },
    reducers: {},
    extraReducers: {
        [updateNews.pending]: (state) => {

        },
        [updateNews.fulfilled]: (state, action) => {
            state.news = action.payload
        },
        [updateNews.rejected]: (state) => {
            state.status = "error"
            state.news = []
        },
        [fetchNews.pending]: (state) => {
            state.status = "loading"
        },
        [fetchNews.fulfilled]: (state, action) => {
            state.news = action.payload
            state.status = "success"
        },
        [fetchNews.rejected]: (state) => {
            state.status = "error"
            state.news = []
        },
        [fetchNewsById.pending]: (state) => {
            state.status = "loading"
            state.currentNews = []
        },
        [fetchNewsById.fulfilled]: (state, action) => {
            state.currentNews = action.payload
            state.status = "success"
        },
        [fetchNewsById.rejected]: (state) => {
            state.status = "error"
            state.currentNews = []
        }
    }
})

export default newsSlice.reducer;