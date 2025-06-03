# todoList

这是一个基于 Vue 3 + TypeScript 开发的 Todo List 学习项目
主要功能包括：任务的增删改查、截止日期设置、拖拽排序、智能搜索、状态筛选。

技术实现：

- 基于 **Vue3 组合式 API**+ **TypeScript** 开发，采用组件化设计
- 使用 **Pinia** 管理状态，采用LocalStorage持久化存储
- ~~通过 **Vue Router** 实现动态路由跳转~~目前查看详情使用了floating-ui
- 使用**媒体查询**适配客户端，优化移动端布局和交互体验
- 使用 **VueDraggable** 实现任务列表拖拽排序

# 网址

https://wuyujie666.github.io/todoList/
![image](https://github.com/user-attachments/assets/09cf072d-77e1-42e9-a221-e67e4136e908)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
