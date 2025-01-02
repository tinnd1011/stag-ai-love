import axiosClient from "./axios-client"

export const SongMakerService = {
    createSong: (prompt: string) => {
        return axiosClient.post(`/api/dapp/music?prompt=${prompt}`)
    },
    getSongByTaskId: (taskId: string) => {
        return axiosClient.get(`/api/dapp/music/${taskId}`)
    }
}