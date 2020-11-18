import { getLastTracks } from "../models/track";

const indexAction = (req, res) => {
    return {
        lastTracks: getLastTracks()
    }
};

export { indexAction };