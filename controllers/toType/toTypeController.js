import axios from 'axios';
const WIKIPEDIA_API_BASE = "https://en.wikipedia.org/api/rest_v1";
const W_PAGE_API = `${WIKIPEDIA_API_BASE}/page`;
const W_FEEDS_API = `${WIKIPEDIA_API_BASE}/feed`;

export default (app) => {
    app.get('/api/random/totype/:filter?', getToType); 
}

const getToType = async (req, res) => {
    let resJson;
    if(req.params.filter) {
        const filter = req.params.filter;
        if(filter == "onthisday") {
            // /feed/onthisday/{type}/{mm}/{dd}
            const today = new Date(Date.now())
            let d = today.getDate();
            if ( d < 10 ) d = '0' + d;
            let m = today.getMonth() + 1; // Month is zero based
            if ( m < 10 ) m = '0' + m;
            const response = await axios.get(`${W_FEEDS_API}/onthisday/events/${m}/${d}`);
            resJson = response.data.events;
        } else if (filter != "random") {
            res.sendStatus(404);
        }
    } else {
        const response = await axios.get(`${W_PAGE_API}/random/summary`);
        resJson = response.data.extract;
    }
    res.json(resJson);
}
