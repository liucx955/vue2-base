<template><div><h1 id="认识-flow" tabindex="-1"><a class="header-anchor" href="#认识-flow" aria-hidden="true">#</a> 认识 Flow</h1>
<p><a href="https://flow.org/en/docs/getting-started/" target="_blank" rel="noopener noreferrer">Flow<ExternalLinkIcon/></a> 是 facebook 出品的 JavaScript 静态类型检查工具。Vue.js 的源码利用了 Flow 做了静态类型检查，所以了解 Flow 有助于我们阅读源码。</p>
<h2 id="为什么用-flow" tabindex="-1"><a class="header-anchor" href="#为什么用-flow" aria-hidden="true">#</a> 为什么用 Flow</h2>
<p>JavaScript 是动态类型语言，它的灵活性有目共睹，但是过于灵活的副作用是很容易就写出非常隐蔽的隐患代码，在编译期甚至看上去都不会报错，但在运行阶段就可能出现各种奇怪的 bug。</p>
<p>类型检查是当前动态类型语言的发展趋势，所谓类型检查，就是在编译期尽早发现（由类型错误引起的）bug，又不影响代码运行（不需要运行时动态检查类型），使编写 JavaScript 具有和编写 Java 等强类型语言相近的体验。</p>
<p>项目越复杂就越需要通过工具的手段来保证项目的维护性和增强代码的可读性。 Vue.js 在做 2.0 重构的时候，在 ES2015 的基础上，除了 ESLint 保证代码风格之外，也引入了 Flow 做静态类型检查。之所以选择 Flow，主要是因为 Babel 和 ESLint 都有对应的 Flow 插件以支持语法，可以完全沿用现有的构建配置，非常小成本的改动就可以拥有静态类型检查的能力。</p>
<h2 id="flow-的工作方式" tabindex="-1"><a class="header-anchor" href="#flow-的工作方式" aria-hidden="true">#</a> Flow 的工作方式</h2>
<p>通常类型检查分成 2 种方式：</p>
<ul>
<li>
<p><strong>类型推断</strong>：通过变量的使用上下文来推断出变量类型，然后根据这些推断来检查类型。</p>
</li>
<li>
<p><strong>类型注释</strong>：事先注释好我们期待的类型，Flow 会基于这些注释来判断。</p>
</li>
</ul>
<h3 id="类型推断" tabindex="-1"><a class="header-anchor" href="#类型推断" aria-hidden="true">#</a> 类型推断</h3>
<p>它不需要任何代码修改即可进行类型检查，最小化开发者的工作量。它不会强制你改变开发习惯，因为它会自动推断出变量的类型。这就是所谓的类型推断，Flow 最重要的特性之一。</p>
<p>通过一个简单例子说明一下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">/*@flow*/</span>

<span class="token keyword">function</span> <span class="token function">split</span><span class="token punctuation">(</span><span class="token parameter">str</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> str<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">' '</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token function">split</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Flow 检查上述代码后会报错，因为函数 <code v-pre>split</code>
期待的参数是字符串，而我们输入了数字。</p>
<h3 id="类型注释" tabindex="-1"><a class="header-anchor" href="#类型注释" aria-hidden="true">#</a> 类型注释</h3>
<p>如上所述，类型推断是 Flow 最有用的特性之一，不需要编写类型注释就能获取有用的反馈。但在某些特定的场景下，添加类型注释可以提供更好更明确的检查依据。</p>
<p>考虑如下代码：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">/*@flow*/</span>

<span class="token keyword">function</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token parameter">x<span class="token punctuation">,</span> y</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">return</span> x <span class="token operator">+</span> y
<span class="token punctuation">}</span>

<span class="token function">add</span><span class="token punctuation">(</span><span class="token string">'Hello'</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Flow 检查上述代码时检查不出任何错误，因为从语法层面考虑， <code v-pre>+</code> 既可以用在字符串上，也可以用在数字上，我们并没有明确指出 <code v-pre>add()</code> 的参数必须为数字。</p>
<p>在这种情况下，我们可以借助类型注释来指明期望的类型。类型注释是以冒号 <code v-pre>:</code> 开头，可以在函数参数，返回值，变量声明中使用。</p>
<p>如果我们在上段代码中添加类型注释，就会变成如下：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">/*@flow*/</span>

<span class="token keyword">function</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">x</span><span class="token operator">:</span> number<span class="token punctuation">,</span> <span class="token literal-property property">y</span><span class="token operator">:</span> number</span><span class="token punctuation">)</span><span class="token operator">:</span> number <span class="token punctuation">{</span>
  <span class="token keyword">return</span> x <span class="token operator">+</span> y
<span class="token punctuation">}</span>

<span class="token function">add</span><span class="token punctuation">(</span><span class="token string">'Hello'</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在 Flow 就能检查出错误，因为函数参数的期待类型为数字，而我们提供了字符串。</p>
<p>上面的例子是针对函数的类型注释。接下来我们来看看 Flow 能支持的一些常见的类型注释。</p>
<h4 id="数组" tabindex="-1"><a class="header-anchor" href="#数组" aria-hidden="true">#</a> 数组</h4>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">/*@flow*/</span>

<span class="token keyword">var</span> <span class="token literal-property property">arr</span><span class="token operator">:</span> Array<span class="token operator">&lt;</span>number<span class="token operator">></span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span>

arr<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token string">'Hello'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>数组类型注释的格式是 <code v-pre>Array&lt;T&gt;</code>，<code v-pre>T</code> 表示数组中每项的数据类型。在上述代码中，arr 是每项均为数字的数组。如果我们给这个数组添加了一个字符串，Flow 能检查出错误。</p>
<h4 id="类和对象" tabindex="-1"><a class="header-anchor" href="#类和对象" aria-hidden="true">#</a> 类和对象</h4>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">/*@flow*/</span>

<span class="token keyword">class</span> <span class="token class-name">Bar</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">x</span><span class="token operator">:</span> string<span class="token punctuation">;</span>           <span class="token comment">// x 是字符串</span>
  <span class="token literal-property property">y</span><span class="token operator">:</span> string <span class="token operator">|</span> number<span class="token punctuation">;</span>  <span class="token comment">// y 可以是字符串或者数字</span>
  <span class="token literal-property property">z</span><span class="token operator">:</span> boolean<span class="token punctuation">;</span>

  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">x</span><span class="token operator">:</span> string<span class="token punctuation">,</span> <span class="token literal-property property">y</span><span class="token operator">:</span> string <span class="token operator">|</span> number</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>x <span class="token operator">=</span> x
    <span class="token keyword">this</span><span class="token punctuation">.</span>y <span class="token operator">=</span> y
    <span class="token keyword">this</span><span class="token punctuation">.</span>z <span class="token operator">=</span> <span class="token boolean">false</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> <span class="token literal-property property">bar</span><span class="token operator">:</span> Bar <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Bar</span><span class="token punctuation">(</span><span class="token string">'hello'</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span>

<span class="token keyword">var</span> <span class="token literal-property property">obj</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">a</span><span class="token operator">:</span> string<span class="token punctuation">,</span> <span class="token literal-property property">b</span><span class="token operator">:</span> number<span class="token punctuation">,</span> <span class="token literal-property property">c</span><span class="token operator">:</span> Array<span class="token operator">&lt;</span>string<span class="token operator">></span><span class="token punctuation">,</span> <span class="token literal-property property">d</span><span class="token operator">:</span> Bar <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token string">'hello'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token number">11</span><span class="token punctuation">,</span>
  <span class="token literal-property property">c</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'hello'</span><span class="token punctuation">,</span> <span class="token string">'world'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">d</span><span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">Bar</span><span class="token punctuation">(</span><span class="token string">'hello'</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>类的类型注释格式如上，可以对类自身的属性做类型检查，也可以对构造函数的参数做类型检查。这里需要注意的是，属性 <code v-pre>y</code> 的类型中间用 <code v-pre>|</code> 做间隔，表示 <code v-pre>y</code> 的类型即可以是字符串也可以是数字。</p>
<p>对象的注释类型类似于类，需要指定对象属性的类型。</p>
<h4 id="null" tabindex="-1"><a class="header-anchor" href="#null" aria-hidden="true">#</a> Null</h4>
<p>若想任意类型 <code v-pre>T</code> 可以为 <code v-pre>null</code> 或者 <code v-pre>undefined</code>，只需类似如下写成 <code v-pre>?T</code> 的格式即可。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">/*@flow*/</span>

<span class="token keyword">var</span> <span class="token literal-property property">foo</span><span class="token operator">:</span> <span class="token operator">?</span>string <span class="token operator">=</span> <span class="token keyword">null</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时，<code v-pre>foo</code> 可以为字符串，也可以为 <code v-pre>null</code>。</p>
<p>目前我们只列举了 Flow 的一些常见的类型注释。如果想了解所有类型注释，请移步 Flow 的<a href="https://flow.org/en/docs/types/" target="_blank" rel="noopener noreferrer">官方文档<ExternalLinkIcon/></a>。</p>
<h2 id="flow-在-vue-js-源码中的应用" tabindex="-1"><a class="header-anchor" href="#flow-在-vue-js-源码中的应用" aria-hidden="true">#</a> Flow 在 Vue.js 源码中的应用</h2>
<p>有时候我们想引用第三方库，或者自定义一些类型，但 Flow 并不认识，因此检查的时候会报错。为了解决这类问题，Flow 提出了一个 <code v-pre>libdef</code> 的概念，可以用来识别这些第三方库或者是自定义类型，而 Vue.js 也利用了这一特性。</p>
<p>在 Vue.js 的主目录下有 <code v-pre>.flowconfig</code> 文件， 它是 Flow 的配置文件，感兴趣的同学可以看<a href="https://flow.org/en/docs/config/" target="_blank" rel="noopener noreferrer">官方文档<ExternalLinkIcon/></a>。这其中的 <code v-pre>[libs]</code> 部分用来描述包含指定库定义的目录，默认是名为 <code v-pre>flow-typed</code> 的目录。</p>
<p>这里 <code v-pre>[libs]</code> 配置的是 <code v-pre>flow</code>，表示指定的库定义都在 <code v-pre>flow</code> 文件夹内。我们打开这个目录，会发现文件如下：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>flow
├── compiler.js        # 编译相关
├── component.js       # 组件数据结构
├── global-api.js      # Global API 结构
├── modules.js         # 第三方库定义
├── options.js         # 选项相关
├── ssr.js             # 服务端渲染相关
├── vnode.js           # 虚拟 node 相关
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到，Vue.js 有很多自定义类型的定义，在阅读源码的时候，如果遇到某个类型并想了解它完整的数据结构的时候，可以回来翻阅这些数据结构的定义。</p>
<h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2>
<p>通过对 Flow 的认识，有助于我们阅读 Vue 的源码，并且这种静态类型检查的方式非常有利于大型项目源码的开发和维护。类似 Flow 的工具还有如 TypeScript，感兴趣的同学也可以自行去了解一下。</p>
</div></template>


