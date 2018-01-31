# #npm发布文档

- 修改package.json文件：

```json
{
    "name": "要发布的包名",
    "version": "版本号，只能递增",
    "description": "包描述",
    "main": "下载包之后的入口文件"
}
```

- 创建npm账号：

```
npm adduser
```
    按提示输入用户名、密码、邮箱，然后到[npm官网](http://note.youdao.com/)验证邮箱


- 登录npm账号：

```
npm login
```
按提示输入用户名、密码、邮箱

- 发布包：

```
npm publish .
```
注意最后有个"."

- 常见错误解决方案：

1. 把npm的源切换回默认的

```
npm config set registry https://registry.npmjs.org
```
2. 去npm官网做邮箱验证

