
import cheerio from "cheerio";
import axios from "axios";
import { back_api, category_list, siteName } from "$src/lib/const";
import moment from "moment-timezone";

export const load = async ({ fetch, url }) => {

    let posts = []

    try {

        const res = await axios.get(`${back_api}/main/base`)
        posts = res.data.get_post_list
        for (let i = 0; i < posts.length; i++) {
            const getCategoryObj = category_list.find(v => v.link === posts[i]["bo_category"]);
            posts[i]["category"] = getCategoryObj['name']
        }


    } catch (error) {
        console.error(error.message);
    }

    const seoValue = {
        title: siteName,
        description: '휴대폰 성지, 인터넷 성지, 핸드폰 성지 알뜰폰에 자급제폰까지! 더싼폰에서 통신비 절약 확실하게 즐겨보자!',
        url: url.href,
        image: `${url.href}logo.png`,
        date: '23-12-07',
        published_time: '2023-12-07T11:46:53+00:00',
        icon: `${url.href}favicon.png`,
    }

    return { posts, seoValue }
}