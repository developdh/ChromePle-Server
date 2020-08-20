
import { createCanvas, loadImage, Canvas } from "canvas";
import getPageBrowserHeight from "../utils/getPageBrowserHeight";
import { browserWidth } from "../consts/consts";
import { getCanvasNames, saveCanvasData, checkCanvasExists, getCanvasData } from "../db/canvasDB";

class CanvasesManager {
    canvases : {[url : string] : Promise<Canvas>} = {};
    addingCanvas : {[url : string] : boolean};
    private canvasIntervals : {[url : string] : NodeJS.Timeout} = {};
    constructor() {

    }
    hasUrl(url : string) {
        return !!this.canvases[url];
    }
    async getCanvas(url : string) {
        if(!this.canvases[url]) this.canvases[url] = this.createCanvas(url);
        const canvas = await this.canvases[url];
        if(!this.canvasIntervals[url]) this.registerCanvas(url, canvas);
        return canvas;
    }
    async createCanvas(url : string) {
        const pageBrowserWidth = browserWidth;
        const pageBrowserHeight = await getPageBrowserHeight(url);
        const canvas = new Canvas(pageBrowserWidth, pageBrowserHeight);
        if(await checkCanvasExists(url)) {
            const context = canvas.getContext("2d");
            const image = await loadImage(await getCanvasData(url));
            if(image.height > canvas.height) canvas.height = image.height;
            context.drawImage(image, 0, 0);
        };
        return canvas;
    }
    async unuseCanvas(url : string) {
        const canvas = this.canvases[url];
        delete this.canvases[url];
        await saveCanvasData(url, (await canvas).toBuffer());
        this.unregisterCanvas(url);
    }
    
    private registerCanvas(url : string, canvas : Canvas) {
        this.canvasIntervals[url] = setInterval(async () => {
            await saveCanvasData(
                url,
                await new Promise((solve, reject) => {
                    canvas.toBuffer((err: Error|null, result: Buffer) => {
                        if(err)
                            reject(err);
                        else
                            solve(result);
                    })
                })
            );
        }, 10000);
    }
    private unregisterCanvas(url : string) {
        clearInterval(this.canvasIntervals[url]);
    }
}

export default CanvasesManager;