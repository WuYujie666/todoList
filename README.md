# todoList

这是一个基于 Vue 3 + TypeScript 开发的 Todo List 学习项目，主要功能包括：

- 任务管理：新增/删除任务
- 日期选择：为任务设置截止日期
- 状态筛选：按完成状态筛选任务
- 详情查看：通过 Vue Router 实现任务详情页

技术实现：
- 状态管理：使用 Pinia 并实现数据持久化存储
- UI 设计：参考了 abdellatif-laghjaj/todo-list 的界面风格

仅作学习记录使用
# 网址
https://wuyujie666.github.io/todoList/
![image](https://github.com/user-attachments/assets/09cf072d-77e1-42e9-a221-e67e4136e908)

# 计划功能

1. 拖动改变任务顺序

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

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
