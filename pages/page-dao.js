import pageModel from "./page-model.js"

export const addPage = async (page) => {
    const curPage = await pageModel.findOne({title: page.title}) 
    if(!curPage) {
        return await pageModel.create(page)
    }
    return curPage
}

export const getPageFromTitle = async (titleStr) => {
    return await pageModel.findOne({title: titleStr})
}
