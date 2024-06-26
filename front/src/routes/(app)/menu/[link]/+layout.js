import axios from 'axios';
import cheerio from "cheerio";
import { back_api, category_list, siteName } from '$lib/const';
import moment from "moment-timezone";

export const prerender = false;

export const load = async ({ params, fetch, url }) => {


    const { link } = params
    let category = ""
    let showType = ""
    let categoryType = ""
    let posts = [];
    let seoValue = {
        title: "",
        description: '부동산 분양의 모든것! 아파트 분양, 오피스텔 분양, 상가 분양, 지식산업센터 분양 등 현재 진행중인 분양 및 청약, 미분양 정보 안내',
        url: url.href,
        image: `${url.href}logo.png`,
        date: '23-12-07',
        published_time: '2023-12-07T11:46:53+00:00',
        icon: `${url.origin}/favicon.png`,
    }

    let nowPage = 1
    let pageArr = [];

    if (url.searchParams.get('page')) {
        nowPage = url.searchParams.get('page')
    }


    const getCategory = category_list.find(v => v.link === link);
    category = getCategory['name']
    showType = getCategory['db']

    console.log(category);
    console.log(showType);
    try {

        const res = await axios.post(`${back_api}/main/menu`, {
            link, showType, nowPage
        })


        if (res.data.status) {
            posts = res.data.posts

            console.log(posts);

            pageArr = createPagination(nowPage, res.data.all_pages)

            for (let i = 0; i < posts.length; i++) {
                const getCategoryObj = category_list.find(v => v.link === posts[i]["bo_category"]);
                posts[i]["category"] = getCategoryObj['name']
            }
        }

        seoValue.title = `${siteName} - ${category}`

    } catch (error) {

    }










    return { posts, category, seoValue, pageArr, nowPage }
}






function createPagination(currentPage, totalPages) {
    let startPage, endPage;
    // const pageNumber 얘를 어떻게 지정할까?



    if (totalPages < 5) {
        console.log('총 페이지 수가 5 이하인 경우, 모든 페이지를 표시');
        // 총 페이지 수가 5 이하인 경우, 모든 페이지를 표시
        startPage = 1;
        endPage = totalPages;
    } else {
        if (currentPage < 4) {
            // 현재 페이지가 5 이하인 경우, 첫 5개 페이지를 표시
            startPage = 1;
            endPage = 5;
        } else if (currentPage > totalPages - 5) {
            // 현재 페이지가 총 페이지 수 - 5 보다 큰 경우, 마지막 5개 페이지를 표시
            startPage = Number(totalPages) - 4;
            endPage = totalPages;
        } else {
            // 그 외의 경우, 현재 페이지를 중심으로 앞뒤 2페이지씩 표시
            startPage = Number(currentPage) - 2;
            endPage = Number(currentPage) + 2;
        }
    }

    // 페이지 배열 생성
    let pages = [];
    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }
    return pages;
}