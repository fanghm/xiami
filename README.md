
```
1.项目构架
	SailsJS + AngularJS + MongoDB

2.项目启动
	|-- 本地：
		|-- sails lift 
	|-- 部署
		|-- forever start xiami.js
	|-- 配置mongodb数据
		|-- 新建xiami-dev数据库
		|-- 新建user
			|-- 密码: sa
			|-- 用户名: root
3.运行过程
	|-- 根据人名去查询数据库, 发现了，数据直接从数据库中取，
		若没有发现,去爬虾米网，并将结果先存入数据库，再发送给前端。
4.测试
	|-- 框架
		|-- should + mocha
	|-- 运行
		|-- npm test
		|-- 或者项目根目录: mocha
	|-- 备注
		|-- 测试前需要先启动服务器，再开一个窗口运行测试脚本
5.心得
	|-- SailsJs真好用，比Express方便多了
	|-- CSS是自己的薄弱点，需要多加努力学习
	|-- MongoDB好用又方便
	|-- 原来可以用robomongo等gui直接连接远程数据库		
```	
