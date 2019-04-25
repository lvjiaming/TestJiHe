/**
 * author: xa
 * time: 2019/4/23
 * func: A*搜索算法
 */

interface List{
    x: number,         // 当前X轴坐标
    y: number,         // 当前Y轴坐标
    weight?: number,   // 当前搜索路径权重
    len?: number,      // 当前点离终点权重
    sum?: number,      // 当前搜索路径权重 yu 当前点离终点权重 之和
    parent?:List,      // 当前节点的 父节点
}

export class SelfAStar{
    /** 搜索起点 */
    private _start: cc.Vec2 = cc.v2(0, 0);
    /** 搜索终点 */
    private _end: cc.Vec2 = cc.v2(9, 9);
    /** 当前地图数据 */
    private _map: Array<Array<number>> = [];
    /** 当前收缩范围 */
    private _searchType: number = 8;

    /**设置起始点 */
    public set start(point: cc.Vec2){
        this._start = point;
    }

    /** 设置终点 */
    public set end(point: cc.Vec2){
        this._end = point;
    }

    /**
     * 设置地图数据
     * 0: 表示无障碍物
     * 1：表示有障碍物
     */
    public set map(mapData:Array<Array<number>>){
        this._map = mapData;
    }

    public set searchType(type: number){
        this._searchType = type;
    }

    constructor(){
        this.initMap();
    }

    /**
     * 自动将地图数据全部置为 0
     * 初始化地图大小默认为 10 X 10
     * @param rows 行数
     * @param cols 列数
     */
    public initMap(rows: number = 10, cols: number = 10){
        for(let i = 0; i < rows; i++){
            let rowMaps = [];
            for(let j = 0; j < cols; j++){
                rowMaps.push(0);
            }
            this._map.push(rowMaps);
        }
    }

    /**
     * A* 搜索函数入口
     */
    public search(){
        let openList: Array<List>      = [],             // 当前扫描过且未搜索路径集
            closeList: Array<List>     = [],             // 当前已被搜索路径集
            result: Array<cc.Vec2>     = [],             // 搜索路径结果集
            resIndex: string | boolean = "";             // 当前路径是否可行

        // 初始化起始点的属性，并存入数组中
        openList.push({
            x: this._start.x,
            y: this._start.y,
            weight: 0
        });

        // 判断当前节点是否有效
        resIndex = this._nodeIsValid(this._end, openList);
        while(!resIndex){
            // 获取当前节点，以及节点周围点
            let current = openList.shift();
            closeList.push(current);
            let surround = this._getSurroundPoint(current);
            // 计算当前点的部分数据
            surround.map( (list: List) => {
                let exit1 = !this._nodeIsValid(list, closeList);
                let inMap = this._isMap(list);
                if(inMap && exit1){
                    let weight = current.weight + ((list.x - current.x) * (list.y - current.y)) === 0 ? 10 : 14; // 计算权重总值
                    let exit2 = !this._nodeIsValid(list, openList);
                    if(exit2){
                        list.len = Math.abs(this._end.x - list.x) * 10 + Math.abs(this._end.y - list.y) * 10;
                        list.weight = weight;
                        list.sum = list.len + list.weight;
                        list.parent = current;
                        openList.push(list);
                    }
                }
            });

            if(openList.length === 0){
                console.log("搜索失败");
                break;
            }

            // 对搜索到的到的节点进行按和值权重进行排序
            openList.sort((listA: List, listB: List)  => {
                return  listA.sum - listB.sum;
            });

            resIndex = this._nodeIsValid(this._end, openList);
        }

        if(resIndex){
            let current: List = openList[resIndex as string];
            while(current.x !== this._start.x && current.y !== this._start.y){
                result.unshift(cc.v2(current.x, current.y));
                current = current.parent;
            }
        }

        return result;

    }

    /**
     * 判断当前点是否在地图中，且该点上无障碍物
     * @param point
     */
    private _isMap(point: List): boolean{
        if(point.x >= 0 &&
            point.y >= 0 &&
            point.x < this._map.length &&
            point.y <= this._map[0].length &&
            this._map[point.x][point.y] <= 0){
            return true;
        }
        else{
            return false;
        }
    }

    /**
     * 判断当前节点是否有效
     * @param node 当前节点
     * @param closeList 已遍历节点
     */
    private _nodeIsValid(node: List, lists: Array<List>):string | boolean{
        for(const index in lists){
            let list = lists[index];
            if(node.x === list.x && node.y === list.y){
                return index;
            }
        }
        return false;
    }

    private _getSurroundPoint(point: List): Array<List>{
        let result = [];
        // 4方位搜索
        result.push(
            {x: point.x, y: point.y - 1},
            {x: point.x, y: point.y + 1},
            {x: point.x - 1, y: point.y},
            {x: point.x + 1, y: point.y}
        );

        // 8方位搜索
        if(this._searchType >= 8){
            result.push(
                {x: point.x - 1, y: point.y - 1},
                {x: point.x + 1, y: point.y - 1},
                {x: point.x - 1, y: point.y + 1},
                {x: point.x + 1, y: point.y + 1}
            );
        }

        return result;
    }
}