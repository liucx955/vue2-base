import { defaultTheme } from "vuepress";

export default defaultTheme({
  home: "/",
  lang: "zh-CN",
  title: "1123",
  logo: "/images/hero.png",
  backToHome: "返回首页",
  logoDark: "https://vuejs.org/images/logo.png",
  navbar: [
    {
      text: "模版编译",
      children: [
        { text: "编译流程", link: "/v2/template/flow" },
        { text: "AST介绍", link: "/v2/template/ast" },
        { text: "AST指针思想", link: "/v2/template/pointer" },
        { text: "AST实现原理", link: "/v2/template/principle" },
      ],
    },
    {
      text: "VNODE和diff",
      children: [
        { text: "h函数", link: "/v2/vnode/hfunction" },
        { text: "diff介绍", link: "/v2/vnode/introduce" },
      ],
    },
    {
      text: "响应式原理",
      children: [
        { text: "defineProperty", link: "/v2/reactive/defineProperty" },
        { text: "defineReactive函数", link: "/v2/vnode/defineReactive" },
      ],
    },
  ],
  sidebar: {
    "/v2/template/": [
      {
        text: "模版编译",
        collapsible: false,
        children: ["flow", "ast", "pointer", "principle"],
      },
    ],
    "/v2/vnode/": [
      {
        text: "VNODE和diff",
        collapsible: false,
        children: ["hfunction", "introduce"],
      },
    ],
    "/v2/reactive/": [
      {
        text: "VNODE和diff",
        collapsible: false,
        children: ["defineProperty", "defineReactive"],
      },
    ],
  },
});
