import axios from 'axios';
import replaceSpecial from 'replace-special-characters';
const WIKIPEDIA_API_BASE = "https://en.wikipedia.org/api/rest_v1";
const WIKIMEDIA_API_BASE = "https://api.wikimedia.org";
const W_PAGE_API = `${WIKIPEDIA_API_BASE}/page`; //Use Legacy API for the get random feature
const W_FEEDS_API = `${WIKIMEDIA_API_BASE}/feed/v1/wikipedia/en`;
const W_SEARCH_API = `${WIKIMEDIA_API_BASE}/core/v1/wikipedia/en/search/page?q=` //Defaults to 50 repsonse limit

export default (app) => {
    app.get('/api/random', getRandom); 
    app.get('/api/onthisday/:type/:dd?/:mm?', getOnDay);
    app.get('/api/search/:terms', getSearched);
}

const sanitizeGoals = (res) => {
    console.log("Res goals: " + res.goals[0])
    return {
        ...res,
        goals: res.goals.map((g) => {
            return{
                title: replaceSpecial(g.title).replaceAll("\xa0", ' ').replaceAll("\u2013", "-"),
                ...res,
                summary: replaceSpecial(g.summary).replaceAll("\xa0", ' ').replaceAll("\u2013", "-")
            }
        })
    }
};


const getOnDay = async (req, res) => {
    // /feed/onthisday/{type}/{mm}/{dd}
    // or /feed/v1/wikipedia/en/onthisday/{type}/{MM}/{DD}
    const today = new Date(Date.now())
    let d = req.params.dd ? req.params.dd : today.getDate();
    if ( d < 10 ) d = '0' + d;
    let m = req.params.mm ? req.params.mm : today.getMonth() + 1; // Month is zero based
    if ( m < 10 ) m = '0' + m;
    const response = await axios.get(`${W_FEEDS_API}/onthisday/${req.params.type}/${m}/${d}`);
    console.log(response.data);
    let goals = []
    if(req.params.type != "all") {
        goals = response.data[req.params.type].filter((article, i) => article.text).map((article, i) => {
            return {
                title: article.pages[0].title.replaceAll('_', ' '),
                summary: article.text,
            }
        })
    } else {
        const extractedGoals = Object.entries(response.data).map(([type, goals]) => {
                return goals.filter((article, i) => article.text).map((article, i) => {
                    return {
                        title: article.pages[0].title.replaceAll('_', ' '),
                        summary: article.text,
                    }
                })
        })
        goals = []
        extractedGoals.forEach((goal) => {
            goals = [...goals, ...goal];
        })
    }
    const resJson = {
        goals: goals,
        typingId: `${d}:${m}:${req.params.type}`
    }
    console.log(sanitizeGoals(resJson));
    res.json(sanitizeGoals(resJson));
}

const getSearched = async (req, res) => {
    const response = await axios.get(`${W_SEARCH_API}${req.params.terms}`);
    console.log(`${W_SEARCH_API}${req.params.terms}`)
    const resJson = {
        goals: response.data.pages.filter((article, i) => article.description).map((article, i) => {
            return { 
                title: article.title.replaceAll('_', ' '),
                summary: article.description,     
            }
        }),
        typingId: `${req.params.terms}`
    }
    res.json(sanitizeGoals(resJson));
}

const getRandom = async (req, res) => {
    const response = await axios.get(`${W_PAGE_API}/random/summary`);
    const resJson = {
        goals: [
            {
                titleRef: response.data.title,
                title: response.data.title.replaceAll('_', ' '),
                summary: response.data.extract,
            }
        ],
        typingId: response.data.titles["canonical"],
    }
    res.json(sanitizeGoals(resJson));
}
