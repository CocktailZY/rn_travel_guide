const BaseUrl="http://121.196.201.35:8080/lyms/";
export default Config={
    LOGIN:BaseUrl+"login/login",//登陆
    REGISTER:BaseUrl+"user/saveUser",//登陆注册接口
    TYPE:BaseUrl+"type/listTypes",//加载景点类型
    VIEWS:BaseUrl+"viewSpot/listViewSpots",//加载景点
    PREVIEWIMAGE:BaseUrl+"image/previewImage",//预览图片
    VIEWSDETAIL:BaseUrl+"viewSpot/getViewSpotById",//预览图片
};