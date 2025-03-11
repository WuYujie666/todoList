这是一个为了练习Vue3和typescript建立的简单的学习项目，ui模仿了https://github.com/abdellatif-laghjaj/todo-list，仅作学习记录使用
以下readme是自动生成的

# todoList

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

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

功能

1. 改变任务顺序
2. 提交检查非空
3. +日期

问题：

1. 架构。父子关系？TodoForm是不是不应该式TodoList的儿子而是兄弟，不然todoForm无法复用给DoneList
2. 父容器根据子容器伸缩 已解决 min-height: 50vh; max-height: 100vh;
3. 由于2，上下改变一点（比如focus input改变几px的边框）、整个父容器就会伸缩，视觉体验凌乱。
4. 完成复选框选中后歪
