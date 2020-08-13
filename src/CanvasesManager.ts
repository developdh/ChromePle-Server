
import { createCanvas, loadImage, Canvas } from "canvas";
import getPageBrowserHeight from "./getPageBrowserHeight";

class CanvasesManager {
    canvases : {[url : string] : Canvas} = {};
    constructor() {

    }
    hasUrl(url : string) {
        return !!this.canvases[url];
    }
    async getCanvas(url : string) {
        if(!this.canvases[url]) await this.addCanvas(url);
    }
    async addCanvas(url : string) {
        const pageBrowserheight = await getPageBrowserHeight(url);
        console.log(`${url}의 페이지 길이 : ${pageBrowserheight}px`);
        //this.canvases[domainName] = new Canvas()
    }
}

export default CanvasesManager;