// const BaseUrl="http://192.168.81.13:8080/lyms/";
const BaseUrl="http://192.168.0.105:8080/lyms/";
//const BaseUrl="http://121.196.201.35:8080/lyms/";
export default Config={
    LOGIN:BaseUrl+"login/login",//登陆
    REGISTER:BaseUrl+"user/saveUser",//登陆注册接口
    CHECK_USER_CODE:BaseUrl+"user/checkUserCode",//登陆注册接口
    TYPE:BaseUrl+"type/listTypes",//加载景点类型
    VIEWS:BaseUrl+"viewSport/pageViewSpots",//加载景点
    PREVIEWIMAGE:BaseUrl+"attachment/previewImage",//预览图片
    VIEWSDETAIL:BaseUrl+"viewSport/getViewSpotById",//预览图片
    GET_COLLECTIONS:BaseUrl+"collection/pageCollections",//查询我的景点的收藏
    PLAN_DETAIL:BaseUrl+"plan/getPlanById",//查询计划的详情
    ROUTE_DETAIL:BaseUrl+"route/getRouteById",//查询路线的详情
    SAVE_COLLECTION:BaseUrl+"collection/saveCollection",//收藏
    GET_COMMENTS:BaseUrl+"comment/listComments",//查邮寄
    listCommentsByDiscuss:BaseUrl+"comment/listCommentsByDiscuss",//查我评论过的
    listCommentsByAppreciate:BaseUrl+"comment/listCommentsByAppreciate",//查点过站的
    listCommentsByids:BaseUrl+"comment/listCommentsByids",//查我浏览过的
    listViewByids:BaseUrl+"viewSport/getViewSpotByIds",//查我浏览过的景点
    SAVE_COMMENT:BaseUrl+"comment/saveComment",//保存邮寄
    UPLOD_IMAGE:BaseUrl+"attachment/uploadFile",//上传图片
    GET_ROUTES:BaseUrl+"route/getRoutesByPlanIds",//获取合适的线路
    GET_VIEW_SPOT_BY_NAME:BaseUrl+"viewSport/getViewSpotByName",//根据景点名称查询景点
    DISCUSS:BaseUrl+"discuss/saveDiscuss",//根据保持评论sa
    List_DISCUSS:BaseUrl+"discuss/listDiscusses",//加载评论列表
    SAVE_APPRECIATE:BaseUrl+"appreciate/saveAppreciate",//点赞
    GET_APPRECIATE_NUM:BaseUrl+"appreciate/getAppreciateNum",//根据保持评论
};