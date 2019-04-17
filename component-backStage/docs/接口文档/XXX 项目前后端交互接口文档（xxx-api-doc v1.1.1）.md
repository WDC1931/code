# XXX项目前后端交互接口文档


|时间|版本号|维护人|维护内容|
|-----|----|-----|----|
|2018/02/23|`1.0.0`|叶丹波|建立文档，新增用户管理相关接口（1.1、1.2、1.3、1.4）|
|2018/04/02|`1.1.0`|叶丹波|新增公司管理相关接口（2.1、2.2、2.3、2.4）|
|2018/04/03|`1.1.1`|叶丹波|修改用户编辑接口支持可选参数`userName`、`sex`和`email`（1.4）|

## 一、接口概述

本文档是XXX项目后台服务为前端页面提供的统一接口调用与交互规范文档说明。

## 二、公共信息

### 1、全局配置

以下配置说明为接口全局的配置或变量，在具体接口文档中不再重复说明。

**接口域名**：`http://www.example.com`

**路径前缀**：`/api/client/`

**调用方式**：`GET`或`POST`

**响应格式**：`JSON`

### 2、正常响应

所有接口都包含以下两个字段，用来说明接口返回数据的状态。

|属性名|类型|长度|说明|
|----|----|----|----|
|`ret`|`Int`|`11`|接口结果，`0`表示成功，其他的表示非正常情况|
|`msg`|`String`|`255`|接口结果说明|

### 3、特殊响应

当接口无法非正常的返回业务数据时，将返回固定的错误码和错误描述说明。

- 缺少参数

```json
{
    "ret": 400,
    "msg": "缺少参数 userName,请补充"
}
```

- 权限不足

```json
{
    "ret": 412,
    "msg": "无访问该接口权限"
}
```

## 三、接口列表

### 1、用户（User）

#### 1.1 添加用户（addUser）

**接口地址**：`http://www.example.com/api/client/addUser`

**调用方式**：`POST`

**接口说明**：添加一个用户

**请求参数**：

|参数名|类型|长度|必要性|说明|
|-----|----|---|----|----|
|`userName`|`String`|`255`|必须|姓名|
|`sex`|`Int`|`4`|必须|性别。可选值：`1`-男，`2`-女|
|`email`|`String`|`255`|可选|电子邮件|
|`companyId`|`Int`|`255`|必须|公司 ID|

**响应数据**

|属性名|类型|长度|说明|
|----|----|----|----|
|`ret`|`Int`|`11`|接口结果，`0`表示成功，其他的表示非正常情况|
|`msg`|`String`|`255`|接口结果说明|

**数据示例**

- 成功

```json
{
    "ret": 0,
    "msg": "添加用户成功"
}
```

- 不成功

```json
{
    "ret": 1,
    "msg": "添加用户失败"
}
```

#### 1.2 用户详情（detailUser）

**接口地址**：`http://www.example.com/api/client/detailUser`

**调用方式**：`GET`

**接口说明**：添加一个用户

**请求参数**：

|参数名|类型|长度|必要性|说明|
|-----|---|----|----|----|
|`userId`|`String`|`11`|必须|用户 ID|

**响应数据**

|属性名|类型|长度|说明|
|----|----|----|----|
|`ret`|`Int`|`11`|接口结果，`0`表示成功，其他的表示非正常情况|
|`msg`|`String`|`255`|接口结果说明|
|`userInfo`|`Object`||用户信息对象|
|`userId`|`String`|`11`|用户 ID|
|`userName`|`String`|`255`|姓名|
|`sex`|`Int`|`4`|性别。可选值：`1`-男，`2`-女|
|`email`|`String`|`255`|电子邮件|
|`companyId`|`Int`|`255`|公司 ID|
|`createdAt`|`String`||创建时间|
|`updatedAt`|`String`||更新时间|

**数据示例**

- 成功

```json
{
    "ret": 0,
    "msg": "查询用户信息成功",
    "userInfo": {
        "userId": 3,
        "userName": "家健",
        "sex": 2,
        "email": "shuj@corp.21cn.com",
        "companyId": 1,
        "createdAt": "2018-07-23T04:35:42.000Z",
        "updatedAt": "2018-07-25T09:29:05.000Z"
    }
}
```

- 不成功

```json
{
    "ret": 1,
    "msg": "查询用户信息失败"
}
```

#### 1.3 用户列表（listUsers）

**接口地址**：`http://www.example.com/api/client/listUsers`

**调用方式**：`GET`

**接口说明**：分页查询用户列表

**请求参数**：

|参数名|类型|长度|必要性|说明|
|-----|---|----|----|----|
|`pageSize`|`Int`|`11`|可选|分页大小。默认值为`10`|
|`pageNum`|`Int`|`11`|可选|分页页码。默认值为`1`|

**响应数据**

|属性名|类型|长度|说明|
|----|----|----|----|
|`ret`|`Int`|`11`|接口结果，`0`表示成功，其他的表示非正常情况|
|`msg`|`String`|`255`|接口结果说明|
|`userList`|`Array`||用户列表数组|
|`userId`|`String`|`11`|用户 ID|
|`userName`|`String`|`255`|姓名|
|`sex`|`Int`|`4`|性别。可选值：`1`-男，`2`-女|
|`email`|`String`|`255`|电子邮件|
|`pageNum`|`Int`|`11`|分页页码|
|`pageSize`|`Int`|`11`|分页大小|
|`totalItems`|`Int`|`11`|总个数|
|`totalPages`|`Int`|`11`|总页数|

**数据示例**

- 成功

```json
{
    "ret": 0,
    "msg": "查询用户列表成功",
    "userList": [
        {
            "userId": 4,
            "userName": "李文武",
            "sex": 1,
            "email": "liww@corp.21cn.com"
        },
        {
            "userId": 3,
            "userName": "家健",
            "sex": 2,
            "email": "shuj@corp.21cn.com"
        }
    ],
    "pageNum": 1,
    "pageSize": 10,
    "totalItems": 1,
    "totalPages": 1
}
```

- 不成功

```json
{
    "ret": 1,
    "msg": "查询用户列表失败"
}
```

#### 1.4 更新用户（updateUser）

**接口地址**：`http://www.example.com/api/client/updateUser`

**调用方式**：`POST`

**接口说明**：更新用户信息

**请求参数**：

|参数名|类型|长度|必要性|说明|
|-----|---|----|----|----|
|`userId`|`Int`|`11`|必须|用户 ID|
|`userName`|`String`|`255`|可选|姓名|
|`sex`|`Int`|`4`|可选|可选值：`1`-男，`2`-女|
|`email`|`String`|`255`|可选|电子邮件|

**响应数据**

|属性名|类型|长度|说明|
|----|----|----|----|
|`ret`|`Int`|`11`|接口结果，`0`表示成功，其他的表示非正常情况|
|`msg`|`String`|`255`|接口结果说明|

**数据示例**

- 成功

```json
{
    "ret": 0,
    "msg": "更新用户信息成功"
}
```

- 不成功

```json
{
    "ret": 1,
    "msg": "更新用户信息失败"
}
```

### 2、公司（Company）

#### 2.1 添加公司（addCompany）

**接口地址**：`http://www.example.com/api/client/addCompany`

**调用方式**：`POST`

**接口说明**：添加一个公司

**请求参数**：

|参数名|类型|长度|必要性|说明|
|-----|---|----|----|----|
|`companyName`|`String`|`255`|必须|姓名|
|`logoUrl`|`String`|`255`|可选|Logo 地址|

**响应数据**

|属性名|类型|长度|说明|
|----|----|----|----|
|`ret`|`Int`|`11`|接口结果，`0`表示成功，其他的表示非正常情况|
|`msg`|`String`|`255`|接口结果说明|

**数据示例**

- 成功

```json
{
    "ret": 0,
    "msg": "添加公司成功"
}
```

- 不成功

```json
{
    "ret": 1,
    "msg": "添加公司失败"
}
```

#### 2.2 公司详情（detailCompany）

**接口地址**：`http://www.example.com/api/client/detailCompany`

**调用方式**：`GET`

**接口说明**：查询一个公司详细信息

**请求参数**：

|参数名|类型|长度|必要性|说明|
|-----|---|----|----|----|
|`companyId`|`Int`|`11`|必须|公司 ID|

**响应数据**

|属性名|类型|长度|说明|
|----|----|----|----|
|`ret`|`Int`|`11`|接口结果，`0`表示成功，其他的表示非正常情况|
|`msg`|`String`|`255`|接口结果说明|
|`companyInfo`|`Object`||公司信息对象|
|`companyId`|`String`|`11`|公司 ID|
|`companyName`|`String`|`255`|公司名称|
|`logoUrl`|`String`|`255`|Logo 地址|


**数据示例**

- 成功

```json
{
    "ret": 0,
    "msg": "查询公司信息成功",
    "companyInfo": {
        "companyId": 1,
        "companyName": "世纪龙信息网络有限责任公司",
        "logoUrl": "http://static.21cnimg.com/css/index/img-index_20130809/21cn_logo.png",
        "createdAt": "2018-07-25T01:24:32.000Z",
        "updatedAt": "2018-07-25T07:14:05.000Z"
    }
}
```

- 不成功

```json
{
    "ret": 1,
    "msg": "查询公司信息失败"
}
```

#### 2.3 公司列表（listCompanys）

**接口地址**：`http://www.example.com/api/client/listCompanys`

**调用方式**：`GET`

**接口说明**：分页查询公司列表

**请求参数**：

|参数名|类型|长度|必要性|说明|
|-----|---|----|----|----|
|`pageSize`|`Int`|`11`|可选|分页大小。默认值为`10`|
|`pageNum`|`Int`|`11`|可选|分页页码。默认值为`1`|

**响应数据**

|属性名|类型|长度|说明|
|----|----|----|----|
|`ret`|`Int`|`11`|接口结果，`0`表示成功，其他的表示非正常情况|
|`msg`|`String`|`255`|接口结果说明|
|`userList`|`Array`||公司列表数组|
|`userId`|`String`|`11`|公司 ID|
|`userName`|`String`|`255`|姓名|
|`sex`|`Int`|`4`|性别。可选值：`1`-男，`2`-女|
|`email`|`String`|`255`|电子邮件|
|`pageNum`|`Int`|`11`|分页页码|
|`pageSize`|`Int`|`11`|分页大小|
|`totalItems`|`Int`|`11`|总个数|
|`totalPages`|`Int`|`11`|总页数|

**数据示例**

- 成功

```json
{
    "ret": 0,
    "msg": "查询公司列表成功",
    "companyList": [
        {
            "companyId": 2,
            "companyName": "中国电信集团有限公司",
            "logoUrl": "http://www.chinatelecom.com.cn/images/dianxin.png",
            "createdAt": "2018-07-25T01:25:53.000Z",
            "updatedAt": "2018-07-25T01:25:57.000Z"
        },
        {
            "companyId": 1,
            "companyName": "世纪龙信息网络有限责任公司",
            "logoUrl": "http://static.21cnimg.com/css/index/img-index_20130809/21cn_logo.png",
            "createdAt": "2018-07-25T01:24:32.000Z",
            "updatedAt": "2018-07-25T07:14:05.000Z"
        }
    ],
    "pageNum": 1,
    "pageSize": 10,
    "totalItems": 2,
    "totalPages": 1
}
```

- 不成功

```json
{
    "ret": 1,
    "msg": "查询公司信息失败"
}
```

#### 2.4 更新公司（updateCompany）

**接口地址**：`http://www.example.com/api/client/updateCompany`

**调用方式**：`POST`

**接口说明**：更新公司信息

**请求参数**：

|参数名|类型|长度|必要性|说明|
|------|----|------|----|
|`companyId`|Int|`11`|必须|公司 ID|
|`companyName`|String|`255`|可选|公司名称|
|`logoUrl`|Int|可选|`255`|Logo 地址|

**响应数据**

|属性名|类型|长度|说明|
|----|----|----|----|
|`ret`|`Int`|`11`|接口结果，`0`表示成功，其他的表示非正常情况|
|`msg`|`String`|`255`|接口结果说明|

**数据示例**

- 成功

```json
{
    "ret": 0,
    "msg": "更新公司信息成功"
}
```

- 不成功

```json
{
    "ret": 1,
    "msg": "更新公司信息失败"
}
```