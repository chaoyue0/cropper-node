# node

## toDoList
### user

- login
- register
- logout
- getUserInfo

## 依赖说明
因json格式天然不能注释，且npm体系内目前没有优雅解，需要以文档形式标注。
每增加一个依赖，要说明其作用，选择依据，版本要求和注意事项，以方便升级和维护。 
依赖的版本，建议固定具体版本，至少固定小版本，主要考虑到npm社区的脆弱性

### 运行依赖 Dependencies

- express： Node框架，主要用于构建Web服务器和处理http请求、响应
- superagent：HTTP客户端库，专门用于发起http请求
- pug：模板引擎，允许我们向视图添加数据，并动态生成HTML
- mongoose：对node环境中MongoDB数据库操作的封装，一个对象模型工具


### 编译依赖 DevDependencies

- nodemon：检测工作区代码的变化，并自动重启