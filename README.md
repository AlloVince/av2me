# An ES6 based NodeJS + ExpressJS Skeleton

[![Build Status](https://travis-ci.org/AlloVince/av2me.svg?branch=master)](https://travis-ci.org/AlloVince/av2me)

Purposes

1. Write in ES6, run in ES5, by Babel 6
2. Using async/await to instead of callback/Promise
3. Custom Errors & Unified Errors handler
4. RESTFul friendly, use Swagger as document and API debugging tool
5. ORM supported by sequelize
6. *DI supported
7. Unit test & coverage report by mocha + chai + isparta
8. Webpack for frontend tool

## ES6 Support

## Exception Designs

## Unit Test

## Code style

代码风格统一采用[Airbnb JavaScript Style](https://github.com/airbnb/javascript), 基于ESlint进行静态检查.

```
npm install --save-dev eslint babel-eslint eslint-config-airbnb eslint-plugin-react
```

项目根目录下新增文件`.eslintrc`

```
{
  "parser": "babel-eslint",
  "extends": "airbnb",
  "rules": {
    "comma-dangle": [
      1,
      "never"
    ],
    "spaced-comment": [
      0,
      "always"
    ]
  }
}
```

考虑到WebStorm的配置, 对Airbnb做了两条修改:

1. Object最后一个属性不需要用逗号结尾
2. `//`注释后无需加空格

### WebStorm 配置

1. 禁止粘贴后代码自动测试化: 
   File > Settings > Editor > General > Smart Keys .. then look for the 'Reformat on paste:' and select None from the drop-down.
2. 开启Formatter Control
   Editor > Code Style > Formatter Control 勾选
3. 缩进统一为2个空格
4. 字符串默认使用双引号改为单引号
5. Object的`{}`内容前后各有一个空格
6. 多个变量使用逗号定义时左对齐

除以上第1,2项外其他均可直接导入airbnb_code_style.xml文件即可

对于要保持缩进的注释,注意在前后增加formatter开关,防止WebStorm自动格式化代码


```
//@formatter:off
/**
  @swagger
 Error:
   properties:
     code:
       type: integer
       format: int32
     message:
       type: string
     fields:
       type: string
*/
//@formatter:on
```