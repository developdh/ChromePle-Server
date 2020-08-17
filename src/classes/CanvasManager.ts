
import { createCanvas, loadImage, Canvas } from "canvas";
import getPageBrowserHeight from "../utils/getPageBrowserHeight";
import { browserWidth } from "../consts/consts";
import { getCanvasNames, saveCanvasData, checkCanvasExists, getCanvasData } from "../db/canvasDB";

class CanvasesManager {
    canvases : {[url : string] : Canvas} = {};
    private canvasIntervals : {[url : string] : NodeJS.Timeout} = {};
    constructor() {
        getCanvasNames();
    }
    hasUrl(url : string) {
        return !!this.canvases[url];
    }
    async getCanvas(url : string) {
        if(!this.canvases[url]) await this.addCanvas(url);
        const canvas = this.canvases[url];
        if(!this.canvasIntervals[url]) this.registerCanvas(url, canvas);
        return canvas;
    }
    async addCanvas(url : string) {
        const pageBrowserWidth = browserWidth;
        const pageBrowserHeight = await getPageBrowserHeight(url);
        const canvas = this.canvases[url] = new Canvas(pageBrowserWidth, pageBrowserHeight);
        if(checkCanvasExists(url)) {
            const context = canvas.getContext("2d");
            const image = await loadImage(getCanvasData(url));
            context.drawImage(image, 0, 0);
        };
    }
    async unuseCanvas(url : string) {
        const canvas = this.canvases[url];
        delete this.canvases[url];
        saveCanvasData(url, canvas.toBuffer());
        this.unregisterCanvas(url);
    }
    
    private registerCanvas(url : string, canvas : Canvas) {
        this.canvasIntervals[url] = setInterval(() => {
            saveCanvasData(url, canvas.toBuffer());
        }, 10000);
    }
    private unregisterCanvas(url : string) {
        clearInterval(this.canvasIntervals[url]);
    }
}

export default CanvasesManager;