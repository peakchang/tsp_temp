
import cheerio from "cheerio";
import axios from "axios";
import { back_api, category_list, siteName } from "$src/lib/const";
import moment from "moment-timezone";

export const load = async ({ fetch, url }) => {

    let ready_list = []

    try {

        const res = await axios.get(`${back_api}/board/load_ready_list`)
        console.log(res);
        if (res.status == 200) {
            ready_list = res.data.ready_list
        }

    } catch (err) {

    }


    return { ready_list }
}