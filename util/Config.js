// const BaseUrl="http://192.168.0.40:8080/lyms/";
const BaseUrl="http://121.196.201.35:8080/lyms/";
export default Config={
    LOGIN:BaseUrl+"login/login",//登陆
    REGISTER:BaseUrl+"user/saveUser",//登陆注册接口
    TYPE:BaseUrl+"type/listTypes",//加载景点类型
    VIEWS:BaseUrl+"viewSport/pageViewSpots",//加载景点
    PREVIEWIMAGE:BaseUrl+"attachment/previewImage",//预览图片
    VIEWSDETAIL:BaseUrl+"viewSport/getViewSpotById",//预览图片
    GET_COLLECTIONS:BaseUrl+"collection/pageCollections",//查询我的景点的收藏
    PLAN_DETAIL:BaseUrl+"plan/getPlanById",//查询路线的详情
    SAVE_COLLECTION:BaseUrl+"collection/saveCollection",//收藏
    GET_COMMENTS:BaseUrl+"comment/listComments",//查邮寄
    SAVE_COMMENT:BaseUrl+"comment/saveComment",//保存邮寄
};