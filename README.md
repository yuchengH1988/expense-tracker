# 家庭記事本 Expense Tracker 
  提供使用者查詢消費紀錄、新增記帳及編輯記帳功能。

## 功能描述 (Features)
* 使用者可以使用登入、登出功能
* 使用者可以使用Fackbook功能登入
* 使用者可以瀏覽總消費金額。
* 使用者可以瀏覽全部消費紀錄。
* 使用者可以依照消費、月份類別進行搜尋
* 使用者可以新增消費紀錄
* 使用者可以修改消費紀錄
* 使用者可以刪除消費紀錄

## 環境建置與需求 (Prerequisites)
1. [MongoDB v4.0 以上](https://www.mongodb.com/download-center/community)
2. [Node.js](https://nodejs.org/en/)

## 安裝與執行步驟 (Installation and Execution)
1.開啟終端機(Terminal)，Clone 此專案至本機電腦。
```
git clone https://github.com/yuchengH1988/expense-tracker
```
2.CD 進入存放此專案的資料夾
```
cd expense-tracker
```
3.安裝 npm 套件
```
輸入 npm install 指令
```
4.新增種子資料
```
輸入npm run seed 指令
```
5.執行專案
```
打開終端機輸入 npm run dev
```
6.使用瀏覽器瀏覽
```
於任一瀏覽器輸入 http://localhost:3000 
```

7.可以使用內建帳號登入
```
Email : root@example.com
Password: 1234
```


## Built With & Tools

* CDN include Bootstrap, jQuery, Popper.js and fontawesome
* bcryptjs
* body-parser
* connect-flash
* dotenv
* express
* express-handlebars
* express-session
* method-override
* mongoose
* passport
* passport-facebook
* passport-local

## Contributor - 專案開發人員

> [Calvin Huang](https://github.com/yuchengH1988)